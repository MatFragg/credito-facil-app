import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Client, CreateClientData, UpdateClientData } from '../../../domain/models/client.model';

export interface ClientFormDialogData {
    mode: 'create' | 'edit';
    client?: Client;
}

export interface ClientFormResult {
    data: CreateClientData | UpdateClientData;
    saveAndNew: boolean;
}

/**
 * Client Form Modal Component
 * Handles creation and editing of clients
 */
@Component({
    selector: 'app-client-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
    form: FormGroup;
    isEditMode: boolean;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<ClientFormComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ClientFormDialogData
    ) {
        this.isEditMode = data.mode === 'edit';
        this.form = this.createForm();
    }

    ngOnInit(): void {
        if (this.isEditMode && this.data.client) {
            this.populateForm(this.data.client);
        }
    }

    /**
     * Create reactive form with validation
     */
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

    /**
     * Populate form with client data for editing
     */
    private populateForm(client: Client): void {
        this.form.patchValue({
            firstName: client.firstName,
            lastName: client.lastName || '',
            dni: client.dni || '',
            email: client.email || '',
            phone: client.phone || '',
            monthlyIncome: client.monthlyIncome || '',
            occupation: client.occupation || '',
            notes: client.notes || ''
        });
    }

    /**
     * Format phone number with +51 prefix
     */
    formatPhone(event: any): void {
        let value = event.target.value.replace(/\D/g, ''); // Remove non-digits

        if (!value.startsWith('51')) {
            if (value.startsWith('9') && value.length <= 9) {
                value = '51' + value;
            }
        }

        if (value.startsWith('51') && value.length <= 11) {
            this.form.patchValue({ phone: '+' + value }, { emitEvent: false });
        }
    }

    /**
     * Format DNI to only accept 8 digits
     */
    formatDni(event: any): void {
        const value = event.target.value.replace(/\D/g, '').substring(0, 8);
        this.form.patchValue({ dni: value }, { emitEvent: false });
    }

    /**
     * Get form field error message
     */
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

    /**
     * Check if form field has error
     */
    hasError(fieldName: string): boolean {
        const field = this.form.get(fieldName);
        return !!(field && field.invalid && field.touched);
    }

    /**
     * Cancel and close modal
     */
    cancel(): void {
        this.dialogRef.close(null);
    }

    /**
     * Submit form (regular save)
     */
    submit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const result: ClientFormResult = {
            data: this.form.value,
            saveAndNew: false
        };

        this.dialogRef.close(result);
    }

    /**
     * Submit and prepare for new entry
     */
    saveAndNew(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const result: ClientFormResult = {
            data: this.form.value,
            saveAndNew: true
        };

        this.dialogRef.close(result);
    }

    /**
     * Reset form for new entry
     */
    resetForm(): void {
        this.form.reset();
        this.form.patchValue({ phone: '+51' });
    }
}
