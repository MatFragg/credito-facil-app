import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Service for displaying user notifications using Angular Material Snackbar
 * Provides different notification types: success, error, warning, info
 */
@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private snackBar = inject(MatSnackBar);

    private readonly defaultConfig: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
    };

    /**
     * Show success notification (green)
     */
    showSuccess(message: string): void {
        this.snackBar.open(message, '✓', {
            ...this.defaultConfig,
            panelClass: ['notification-success'],
        });
    }

    /**
     * Show error notification (red)
     */
    showError(message: string): void {
        this.snackBar.open(message, '✕', {
            ...this.defaultConfig,
            duration: 5000, // Errors stay longer
            panelClass: ['notification-error'],
        });
    }

    /**
     * Show warning notification (orange)
     */
    showWarning(message: string): void {
        this.snackBar.open(message, '⚠', {
            ...this.defaultConfig,
            panelClass: ['notification-warning'],
        });
    }

    /**
     * Show info notification (blue)
     */
    showInfo(message: string): void {
        this.snackBar.open(message, 'ℹ', {
            ...this.defaultConfig,
            panelClass: ['notification-info'],
        });
    }
}
