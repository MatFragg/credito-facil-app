/**
 * Create Settings Request DTO
 * Matches backend SettingsRequest
 */
export interface CreateSettingsDto {
    currency: string;
    language: string;
    interestRateType: string;
    capitalization: string | null;
    gracePeriodType: string;
    graceMonths: number;
    isCurrentSetting: boolean;
}
