import { Component, EventEmitter, Input, Output, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseFormComponent } from '../base-form/base-form.component';
import { NotificationService } from '../../../core/services/notification.service';

/**
 * ✅ CHALLENGE #3 SOLUTION: Error Notification Handling
 * 
 * Generic Modal Form Component for Create/Update Operations
 * Extends BaseFormComponent to provide modal-specific functionality
 * 
 * FEATURES:
 * ✅ Supports both CREATE and EDIT modes
 * ✅ Modal backdrop and styling
 * ✅ Emits saved/cancelled events
 * ✅ Error/success notifications implemented
 */
@Component({
  selector: 'app-base-modal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-overlay" (click)="onCancel()" *ngIf="isOpen">
      <div class="modal-container" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <button 
            type="button" 
            class="modal-close" 
            (click)="onCancel()"
            [disabled]="isSubmitting">
            ×
          </button>
        </div>
        
        <div class="modal-body">
          <ng-content></ng-content>
        </div>
        
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary" 
            (click)="onCancel()"
            [disabled]="isSubmitting">
            Cancelar
          </button>
          <button 
            type="submit" 
            class="btn btn-primary" 
            (click)="onSubmit()"
            [disabled]="isSubmitting">
            {{ isSubmitting ? 'Guardando...' : saveButtonText }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s ease-in-out;
    }

    .modal-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      width: 90%;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      animation: slideIn 0.3s ease-out;
    }

    .modal-header {
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #111827;
    }

    .modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #6b7280;
      padding: 0;
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: all 0.2s;
    }

    .modal-close:hover:not(:disabled) {
      background-color: #f3f4f6;
      color: #111827;
    }

    .modal-close:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      flex: 1;
    }

    .modal-footer {
      padding: 1.5rem;
      border-top: 1px solid #e5e7eb;
      display: flex;
      gap: 0.75rem;
      justify-content: flex-end;
    }

    .btn {
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-weight: 500;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      font-size: 0.875rem;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-secondary {
      background-color: #f3f4f6;
      color: #374151;
    }

    .btn-secondary:hover:not(:disabled) {
      background-color: #e5e7eb;
    }

    .btn-primary {
      background-color: #3b82f6;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #2563eb;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export abstract class BaseModalFormComponent extends BaseFormComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() title: string = 'Formulario';
  @Input() saveButtonText: string = 'Guardar';
  @Input() entityId?: number; // For edit mode

  @Output() saved = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  // ✅ CHALLENGE #3 SOLUTION: Inject NotificationService
  protected notificationService = inject(NotificationService);

  override ngOnInit(): void {
    super.ngOnInit();
  }

  onCancel(): void {
    if (!this.isSubmitting) {
      this.form.reset();
      this.cancelled.emit();
    }
  }

  /**
   * ✅ CHALLENGE #3 SOLUTION: Show success notification
   */
  protected override onSubmitSuccess(): void {
    this.notificationService.showSuccess('Guardado exitosamente');
    this.saved.emit(this.form.value);
    this.form.reset();
  }

  /**
   * ✅ CHALLENGE #3 SOLUTION: Show error notification with detailed messages
   */
  protected override onSubmitError(error: any): void {
    console.error('Form submission error:', error);

    let errorMessage = 'Error al guardar. Intente nuevamente.';

    // Parse different error types
    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401:
        case 403:
          errorMessage = 'No tiene permisos para realizar esta acción';
          break;
        case 400:
          errorMessage = 'Datos inválidos. Revise el formulario';
          break;
        case 500:
          errorMessage = 'Error del servidor. Intente más tarde';
          break;
        case 0:
          errorMessage = 'Sin conexión. Verifique su internet';
          break;
        default:
          errorMessage = error.error?.message || error.message || errorMessage;
      }
    } else if (error?.message) {
      errorMessage = error.message;
    }

    this.notificationService.showError(errorMessage);
  }
}

/**
 * TODO CHALLENGE #3: Create NotificationService
 * 
 * Create a new file: src/app/core/services/notification.service.ts
 * 
 * Interface suggestion:
 * export interface NotificationService {
 *   showSuccess(message: string): void;
 *   showError(message: string): void;
 *   showWarning(message: string): void;
 *   showInfo(message: string): void;
 * }
 * 
 * Implementation options:
 * 1. SIMPLE: Use window.alert() or custom div overlay
 * 2. INTERMEDIATE: Create toast component with animations
 * 3. ADVANCED: Integrate Angular Material Snackbar or ng-toast library
 */
