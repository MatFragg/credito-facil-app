import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import { BaseFormComponent } from '../../../../../shared/components/base-form/base-form.component';
import { LoginUseCase } from '../../../domain/usecases/login.usecase';
import { Credentials } from '../../../domain/models/auth.models';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TurnstileService } from '../../../../../core/services/turnstile.service';

@Component({
  selector: 'app-login-form',
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatCardHeader,
    MatFormField,
    MatInput,
    MatError,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatIconModule,
    RouterModule,
    MatLabel
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent extends BaseFormComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() toggleView = new EventEmitter<void>();
  @ViewChild('turnstileContainer', { read: ElementRef }) turnstileContainer?: ElementRef;

  constructor(
    private builder: FormBuilder,
    private loginUseCase: LoginUseCase,
    private router: Router,
    private turnstileService: TurnstileService
  ) {
    super();
  }

  override buildForm(): void {
    this.form = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  ngAfterViewInit(): void {
    // Render Turnstile widget after view initialization
    if (this.turnstileContainer) {
      this.turnstileService.render(this.turnstileContainer.nativeElement)
        .then(() => {
        })
        .catch(error => {
        });
    }
  }

  override submitForm(): Observable<any> {
    // Get Turnstile token
    const turnstileToken = this.turnstileService.getToken();

    const credentials: Credentials = {
      email: this.form.value.email,
      password: this.form.value.password,
      rememberMe: this.form.value.rememberMe,
      turnstileToken: turnstileToken || undefined
    };


    return this.loginUseCase.execute(credentials);
  }

  protected override onSubmitSuccess(): void {
    console.log('Login exitoso');
    this.router.navigate(['/dashboard']);
  }

  protected override onSubmitError(error: any): void {
    console.error('Error en el login:', error);

    // Reset Turnstile widget on error
    this.turnstileService.reset();

    // Handle 403 Forbidden (Turnstile validation failed)
    if (error.status === 403) {
      this.form.setErrors({ turnstileValidation: true });
    } else {
      this.form.setErrors({ invalidCredentials: true });
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    // Clean up Turnstile widget
    this.turnstileService.remove();
  }
}
