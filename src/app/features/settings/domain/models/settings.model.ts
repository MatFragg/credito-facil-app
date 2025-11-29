import { Currency } from './currency.enum';
import { InterestRateType } from './interest-rate-type.enum';
import { Capitalization } from './capitalization.enum';
import { GracePeriodType } from './grace-period-type.enum';

/**
 * Settings Domain Model
 * Represents user's simulation configuration
 */
export interface Settings {
    id: number;
    userId: number;
    currency: Currency;
    language: string;
    interestRateType: InterestRateType;
    capitalization: Capitalization | null;
    gracePeriodType: GracePeriodType;
    graceMonths: number;
    isCurrentSetting: boolean;
    createdAt: Date;
}

/**
 * Data for creating new settings
 */
export interface CreateSettingsData {
    currency: Currency;
    language: string;
    interestRateType: InterestRateType;
    capitalization: Capitalization | null;
    gracePeriodType: GracePeriodType;
    graceMonths: number;
    isCurrentSetting: boolean;
}

/**
 * Data for updating settings
 */
export interface UpdateSettingsData {
    currency: Currency;
    language: string;
    interestRateType: InterestRateType;
    capitalization: Capitalization | null;
    gracePeriodType: GracePeriodType;
    graceMonths: number;
    isCurrentSetting: boolean;
}

/**
 * Paginated Settings
 */
export interface PaginatedSettings {
    content: Settings[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

/**
 * Settings Helper Functions
 */
export class SettingsHelpers {
    /**
     * Check if rate type requires capitalization
     */
    static requiresCapitalization(settings: Settings): boolean {
        return settings.interestRateType === InterestRateType.NOMINAL;
    }

    /**
     * Get formatted creation date
     */
    static getFormattedDate(settings: Settings): string {
        return settings.createdAt.toLocaleDateString('es-PE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    /**
     * Check if settings are current
     */
    static isCurrent(settings: Settings): boolean {
        return settings.isCurrentSetting;
    }
}

/**
 * Default Settings Values
 */
export class SettingsDefaults {
    static readonly DEFAULT_SETTINGS: CreateSettingsData = {
        currency: Currency.PEN,
        language: 'es',
        interestRateType: InterestRateType.EFFECTIVE,
        capitalization: null, // Only for nominal rates
        gracePeriodType: GracePeriodType.NONE,
        graceMonths: 0,
        isCurrentSetting: true
    };
}
