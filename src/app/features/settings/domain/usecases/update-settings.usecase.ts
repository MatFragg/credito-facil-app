import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsRepository } from '../repositories/settings.repository';
import { Settings, UpdateSettingsData } from '../models/settings.model';
import { InterestRateType } from '../models/interest-rate-type.enum';
import { Currency } from '../models/currency.enum';

/**
 * Use Case: Update Settings
 * Updates existing settings with business validation
 */
@Injectable()
export class UpdateSettingsUseCase {
    constructor(private repository: SettingsRepository) { }

    execute(id: number, data: UpdateSettingsData): Observable<Settings> {
        // Validate ID
        if (!id || id <= 0) {
            throw new Error('Invalid settings ID');
        }

        // Business validation
        this.validateSettings(data);

        // Force language to Spanish
        const settingsData: UpdateSettingsData = {
            ...data,
            language: 'es'
        };

        return this.repository.update(id, settingsData);
    }

    private validateSettings(data: UpdateSettingsData): void {
        // Validate currency
        if (data.currency !== Currency.PEN && data.currency !== Currency.USD) {
            throw new Error('Currency must be PEN or USD');
        }

        // Validate capitalization requirement
        if (data.interestRateType === InterestRateType.NOMINAL) {
            if (!data.capitalization) {
                throw new Error('Capitalization is required for nominal interest rates');
            }
        } else {
            // For effective rates, capitalization must be null
            if (data.capitalization !== null) {
                throw new Error('Capitalization is not applicable for effective interest rates');
            }
        }

        // Validate grace months
        if (data.graceMonths < 0) {
            throw new Error('Grace months cannot be negative');
        }

        if (data.graceMonths > 60) {
            throw new Error('Grace months cannot exceed 60');
        }
    }
}
