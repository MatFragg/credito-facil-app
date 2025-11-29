import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SettingsFacade } from '../../state/settings.facade';
import { SettingsFormComponent } from '../../components/settings-form/settings-form.component';
import { CreateSettingsData, UpdateSettingsData } from '../../../domain/models/settings.model';

@Component({
    selector: 'app-settings-page',
    standalone: true,
    imports: [
        CommonModule,
        MatSnackBarModule,
        SettingsFormComponent
    ],
    templateUrl: './settings-page.component.html',
    styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
    constructor(
        public facade: SettingsFacade,
        private snackBar: MatSnackBar
    ) { }

    ngOnInit(): void {
        this.facade.loadCurrentSettings();
        this.facade.loadHistory();
    }

    /**
     * Handle settings saved
     */
    onSettingsSaved(data: CreateSettingsData | UpdateSettingsData): void {
        const currentSettings = this.facade.currentSettings();

        if (currentSettings) {
            // Update existing settings
            this.facade.updateSettings(currentSettings.id, data as UpdateSettingsData);
        } else {
            // Create new settings
            this.facade.createSettings(data as CreateSettingsData);
        }

        // Show success message (wait for facade to complete)
        setTimeout(() => {
            if (!this.facade.error()) {
                this.snackBar.open('Configuración guardada exitosamente', 'Cerrar', {
                    duration: 3000,
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom'
                });
            }
        }, 500);
    }

    /**
     * Handle reset to defaults
     */
    onResetToDefaults(): void {
        if (confirm('¿Está seguro de que desea restablecer los valores por defecto?')) {
            this.facade.resetToDefaults();

            setTimeout(() => {
                if (!this.facade.error()) {
                    this.snackBar.open('Configuración restablecida a valores por defecto', 'Cerrar', {
                        duration: 3000,
                        horizontalPosition: 'end',
                        verticalPosition: 'bottom'
                    });
                }
            }, 500);
        }
    }

    /**
     * Handle error display
     */
    showError(message: string): void {
        this.snackBar.open(message, 'Cerrar', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
        });
    }
}
