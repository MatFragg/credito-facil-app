import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsRepository } from '../repositories/settings.repository';
import { Settings } from '../models/settings.model';
import { SettingsDefaults } from '../models/settings.model';

/**
 * Use Case: Reset to Defaults
 * Resets settings to default values by creating a new settings record
 */
@Injectable()
export class ResetToDefaultsUseCase {
    constructor(private repository: SettingsRepository) { }

    execute(): Observable<Settings> {
        // Create new settings with default values
        return this.repository.create(SettingsDefaults.DEFAULT_SETTINGS);
    }
}
