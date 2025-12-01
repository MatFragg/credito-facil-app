import { Injectable, signal, computed } from '@angular/core';
import { SettingsState, initialSettingsState } from './settings.state';
import { Settings, CreateSettingsData, UpdateSettingsData, PaginatedSettings } from '../../domain/models/settings.model';
import { GetCurrentSettingsUseCase } from '../../domain/usecases/get-current-settings.usecase';
import { GetSettingsHistoryUseCase } from '../../domain/usecases/get-settings-history.usecase';
import { CreateSettingsUseCase } from '../../domain/usecases/create-settings.usecase';
import { UpdateSettingsUseCase } from '../../domain/usecases/update-settings.usecase';
import { ResetToDefaultsUseCase } from '../../domain/usecases/reset-to-defaults.usecase';

/**
 * Settings Facade
 * Manages settings state using Angular Signals
 */
@Injectable()
export class SettingsFacade {
    // Private state signal
    private state = signal<SettingsState>(initialSettingsState);

    // Public computed signals
    currentSettings = computed(() => this.state().currentSettings);
    history = computed(() => this.state().history);
    loading = computed(() => this.state().loading);
    saving = computed(() => this.state().saving);
    loadingHistory = computed(() => this.state().loadingHistory);
    error = computed(() => this.state().error);

    constructor(
        private getCurrentSettingsUseCase: GetCurrentSettingsUseCase,
        private getSettingsHistoryUseCase: GetSettingsHistoryUseCase,
        private createSettingsUseCase: CreateSettingsUseCase,
        private updateSettingsUseCase: UpdateSettingsUseCase,
        private resetToDefaultsUseCase: ResetToDefaultsUseCase
    ) { }

    /**
     * Load current user settings
     */
    loadCurrentSettings(): void {
        this.state.update(s => ({ ...s, loading: true, error: null }));

        this.getCurrentSettingsUseCase.execute().subscribe({
            next: (settings) => {
                this.state.update(s => ({
                    ...s,
                    currentSettings: settings,
                    loading: false
                }));
            },
            error: (error) => {
                // If settings don't exist (404), that's OK - allow creation
                if (error.status === 404 || error.status === 0 || error.message?.includes('404')) {
                    this.state.update(s => ({
                        ...s,
                        currentSettings: null,
                        loading: false,
                        error: null // No error - this is expected when no settings exist
                    }));
                } else {
                    // Other errors should be shown
                    this.state.update(s => ({
                        ...s,
                        loading: false,
                        error: error.message || 'Error loading settings'
                    }));
                }
            }
        });
    }

    /**
     * Load settings history
     */
    loadHistory(page: number = 0, size: number = 20): void {
        this.state.update(s => ({ ...s, loadingHistory: true, error: null }));

        this.getSettingsHistoryUseCase.execute(page, size).subscribe({
            next: (history) => {
                this.state.update(s => ({
                    ...s,
                    history,
                    loadingHistory: false
                }));
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    loadingHistory: false,
                    error: error.message || 'Error loading settings history'
                }));
            }
        });
    }

    /**
     * Create new settings
     */
    createSettings(data: CreateSettingsData): void {
        this.state.update(s => ({ ...s, saving: true, error: null }));

        this.createSettingsUseCase.execute(data).subscribe({
            next: (settings) => {
                this.state.update(s => ({
                    ...s,
                    currentSettings: settings,
                    saving: false
                }));
                // Refresh history to show new entry
                this.loadHistory();
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    saving: false,
                    error: error.message || 'Error creating settings'
                }));
            }
        });
    }

    /**
     * Update existing settings
     */
    updateSettings(id: number, data: UpdateSettingsData): void {
        this.state.update(s => ({ ...s, saving: true, error: null }));

        this.updateSettingsUseCase.execute(id, data).subscribe({
            next: (settings) => {
                this.state.update(s => ({
                    ...s,
                    currentSettings: settings,
                    saving: false
                }));
                // Refresh history to show updated entry
                this.loadHistory();
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    saving: false,
                    error: error.message || 'Error updating settings'
                }));
            }
        });
    }

    /**
     * Reset to default values
     */
    resetToDefaults(): void {
        this.state.update(s => ({ ...s, saving: true, error: null }));

        this.resetToDefaultsUseCase.execute().subscribe({
            next: (settings) => {
                this.state.update(s => ({
                    ...s,
                    currentSettings: settings,
                    saving: false
                }));
                // Refresh history to show reset entry
                this.loadHistory();
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    saving: false,
                    error: error.message || 'Error resetting settings'
                }));
            }
        });
    }

    /**
     * Clear error
     */
    clearError(): void {
        this.state.update(s => ({ ...s, error: null }));
    }
}
