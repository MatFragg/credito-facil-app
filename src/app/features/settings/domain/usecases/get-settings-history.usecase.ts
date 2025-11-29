import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsRepository } from '../repositories/settings.repository';
import { PaginatedSettings } from '../models/settings.model';

/**
 * Use Case: Get Settings History
 * Retrieves paginated settings history for audit purposes
 */
@Injectable()
export class GetSettingsHistoryUseCase {
    constructor(private repository: SettingsRepository) { }

    execute(page: number = 0, size: number = 20): Observable<PaginatedSettings> {
        if (page < 0) {
            throw new Error('Page number cannot be negative');
        }

        if (size < 1 || size > 100) {
            throw new Error('Page size must be between 1 and 100');
        }

        return this.repository.getSettingsHistory(page, size);
    }
}
