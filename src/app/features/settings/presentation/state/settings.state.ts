import { Settings, PaginatedSettings } from '../../domain/models/settings.model';

/**
 * Settings State Interface
 * Defines the shape of settings feature state
 */
export interface SettingsState {
    // Current settings (active configuration)
    currentSettings: Settings | null;

    // Settings history for audit
    history: PaginatedSettings | null;

    // Loading states
    loading: boolean;
    saving: boolean;
    loadingHistory: boolean;

    // Error state
    error: string | null;
}

/**
 * Initial state
 */
export const initialSettingsState: SettingsState = {
    currentSettings: null,
    history: null,
    loading: false,
    saving: false,
    loadingHistory: false,
    error: null
};
