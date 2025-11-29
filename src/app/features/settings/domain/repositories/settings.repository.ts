import { Observable } from 'rxjs';
import { Settings, CreateSettingsData, UpdateSettingsData, PaginatedSettings } from '../models/settings.model';

/**
 * Settings Repository Interface
 * Abstract repository for settings data access
 */
export abstract class SettingsRepository {
    /**
     * Get current user's settings
     */
    abstract getCurrentSettings(): Observable<Settings>;

    /**
     * Get settings history with pagination
     */
    abstract getSettingsHistory(page: number, size: number, sort?: string): Observable<PaginatedSettings>;

    /**
     * Get settings by ID
     */
    abstract getById(id: number): Observable<Settings>;

    /**
     * Create new settings
     */
    abstract create(data: CreateSettingsData): Observable<Settings>;

    /**
     * Update settings
     */
    abstract update(id: number, data: UpdateSettingsData): Observable<Settings>;

    /**
     * Delete settings
     */
    abstract delete(id: number): Observable<void>;
}
