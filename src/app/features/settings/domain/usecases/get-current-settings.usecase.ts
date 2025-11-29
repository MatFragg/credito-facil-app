import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsRepository } from '../repositories/settings.repository';
import { Settings } from '../models/settings.model';

/**
 * Use Case: Get Current Settings
 * Retrieves the current user's active settings
 */
@Injectable()
export class GetCurrentSettingsUseCase {
    constructor(private repository: SettingsRepository) { }

    execute(): Observable<Settings> {
        return this.repository.getCurrentSettings();
    }
}
