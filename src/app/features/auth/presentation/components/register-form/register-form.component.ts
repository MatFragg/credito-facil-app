import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import { BaseFormComponent } from '../../../../../shared/components/base-form/base-form.component';
import { RegisterUseCase } from '../../../domain/usecases/register.usecase';
import { RegisterData } from '../../../domain/models/auth.models';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { TurnstileService } from '../../../../../core/services/turnstile.service';

@Component({
    selector: 'app-register-form',
    standalone: true,
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
        MatIconModule,
        RouterModule,
        MatLabel
    ],
    templateUrl: './register-form.component.html',
    styleUrl: './register-form.component.css'
})
export class RegisterFormComponent extends BaseFormComponent implements OnInit, OnDestroy, AfterViewInit {

    @Output() toggleView = new EventEmitter<void>();
    @ViewChild('turnstileContainer', { read: ElementRef }) turnstileContainer?: ElementRef;

    constructor(
        private builder: FormBuilder,
        private registerUseCase: RegisterUseCase,
        private router: Router,
        private turnstileService: TurnstileService
    ) {
        super();
    }

    override buildForm(): void {
        this.form = this.builder.group({
            firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
            username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            confirmPassword: ['', [Validators.required]]
        });
    }

    ngAfterViewInit(): void {
        // Render Turnstile widget after view initialization
        if (this.turnstileContainer) {
            this.turnstileService.render(this.turnstileContainer.nativeElement)
                .catch(error => {
                    console.error('Error rendering Turnstile:', error);
                });
        }
    }

    override submitForm(): Observable<any> {
        // Get Turnstile token
        const turnstileToken = this.turnstileService.getToken();

        const registerData: RegisterData = {
            firstName: this.form.value.firstName,
            lastName: this.form.value.lastName,
            username: this.form.value.username,
            email: this.form.value.email,
            password: this.form.value.password,
            confirmPassword: this.form.value.confirmPassword,
            turnstileToken: turnstileToken || undefined
        };

        return this.registerUseCase.execute(registerData);
    }

    protected override onSubmitSuccess(): void {
        console.log('Registro exitoso');
        this.router.navigate(['/dashboard']);
    }

    protected override onSubmitError(error: any): void {
        console.error('Error en el registro:', error);

        // Reset Turnstile widget on error
        this.turnstileService.reset();

        // Handle 403 Forbidden (Turnstile validation failed)
        if (error.status === 403) {
            this.form.setErrors({ turnstileValidation: true });
            return;
        }

        // Handle different error types
        if (error.message?.includes('contraseñas no coinciden')) {
            this.form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
        } else if (error.message?.includes('8 caracteres')) {
            this.form.get('password')?.setErrors({ minlength: true });
        } else {
            this.form.setErrors({ registrationError: true });
        }
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
        // Clean up Turnstile widget
        this.turnstileService.remove();
    }
}
