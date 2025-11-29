import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-base-form',
    template: ''
})
export abstract class BaseFormComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  isSubmitting: boolean = false;
  protected destroy$ = new Subject<void>();

   ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  abstract buildForm(): void;

  onSubmit(): void {
    if (this.form.valid) {
      this.isSubmitting = true;
      this.submitForm().pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.onSubmitSuccess();
        },
        error: (error) => {
          this.isSubmitting = false;
          this.onSubmitError(error);
        },
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  abstract submitForm(): Observable<any>;

  protected onSubmitSuccess(): void {}
  protected onSubmitError(error: any): void {}

  protected isInvalidControl(form: FormGroup, controlName: string): boolean {
    return form.controls[controlName].invalid && form.controls[controlName].touched;
  }

  private errorMessageForControl(controlName: string, errorKey: string): string {
    switch (errorKey) {
      case 'required':
        return `The field ${controlName} is required.`;
      default:
        return `The field ${controlName} is invalid.`;
    }
  }

  protected errorMessagesForControl(form: FormGroup, controlName: string): string {
    const control = form.controls[controlName];
    let errorMessages = '';
    const errors = control.errors;
    if (!errors) return errorMessages;
    Object.keys(errors).forEach((errorKey) => {
      errorMessages += this.errorMessageForControl(controlName, errorKey);
    });
    return errorMessages;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.form.controls).forEach((key) => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }
}