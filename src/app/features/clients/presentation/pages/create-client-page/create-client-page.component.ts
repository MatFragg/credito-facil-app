import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CreateClientUseCase } from '../../../domain/usecases/create-client.usecase';

@Component({
    selector: 'app-create-client-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatCardModule
    ],
    templateUrl: './create-client-page.component.html',
    styleUrls: ['./create-client-page.component.css']
})
export class CreateClientPageComponent implements OnInit {
    form: FormGroup;
    isSubmitting = false;

    constructor(
        private fb: FormBuilder,
        private createClientUseCase: CreateClientUseCase,
        private router: Router,
        private snackBar: MatSnackBar
    ) {
        this.form = this.createForm();
    }

    ngOnInit(): void {
        this.form.patchValue({ phone: '+51' });
    }

    private createForm(): FormGroup {
        return this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^\+51\d{9}$/)]],
            monthlyIncome: ['', [Validators.required, Validators.min(0)]],
            occupation: [''],
            notes: ['']
        });
    }

    formatPhone(event: any): void {
        let value = event.target.value.replace(/\D/g, '');

        if (!value.startsWith('51')) {
            if (value.startsWith('9') && value.length <= 9) {
                value = '51' + value;
            }
        }

        if (value.startsWith('51') && value.length <= 11) {
            this.form.patchValue({ phone: '+' + value }, { emitEvent: false });
        }
    }

    formatDni(event: any): void {
        const value = event.target.value.replace(/\D/g, '').substring(0, 8);
        this.form.patchValue({ dni: value }, { emitEvent: false });
    }

    getErrorMessage(fieldName: string): string {
        const field = this.form.get(fieldName);
        if (!field || !field.errors || !field.touched) return '';

        if (field.errors['required']) return 'Este campo es obligatorio';
        if (field.errors['email']) return 'Email inválido';
        if (field.errors['pattern']) {
            if (fieldName === 'dni') return 'DNI debe tener 8 dígitos';
            if (fieldName === 'phone') return 'Teléfono debe tener formato +51XXXXXXXXX';
        }
        if (field.errors['min']) return 'El valor debe ser mayor a 0';
        if (field.errors['minLength']) return `Mínimo ${field.errors['minLength'].requiredLength} caracteres`;

        return '';
    }

    hasError(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }

    cancel(): void {
        this.router.navigate(['/clients']);
    }

    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;

        // Prepare data: strip +51 prefix from phone for backend
        const formData = { ...this.form.value };
        if (formData.phone && formData.phone.startsWith('+51')) {
            formData.phone = formData.phone.substring(3);
        }

        this.createClientUseCase.execute(formData).subscribe({
            next: () => {
                this.snackBar.open('Cliente creado exitosamente', 'Cerrar', {
                    duration: 3000,
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom'
                });
                setTimeout(() => {
                    this.isSubmitting = false;
                    this.router.navigate(['/clients']);
                }, 500);
            },
            error: (error: any) => {
                this.isSubmitting = false;
                this.snackBar.open('Error al crear cliente: ' + error.message, 'Cerrar', {
                    duration: 5000,
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom'
                });
            }
        });
    }

    saveAndNew(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;

        // Prepare data: strip +51 prefix from phone for backend
        const formData = { ...this.form.value };
        if (formData.phone && formData.phone.startsWith('+51')) {
            formData.phone = formData.phone.substring(3);
        }

        this.createClientUseCase.execute(formData).subscribe({
            next: () => {
                this.snackBar.open('Cliente creado exitosamente', 'Cerrar', {
                    duration: 3000,
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom'
                });
                this.form.reset();
                this.form.patchValue({ phone: '+51' });
                this.isSubmitting = false;
            },
            error: (error: any) => {
                this.isSubmitting = false;
                this.snackBar.open('Error al crear cliente: ' + error.message, 'Cerrar', {
                    duration: 5000,
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom'
                });
            }
        });
    }
}
