/**
 * Update Settings Request DTO
 * Same as CreateSettingsDto for settings
 */
export interface UpdateSettingsDto {
    currency: string;
    language: string;
    interestRateType: string;
    capitalization: string | null;
    gracePeriodType: string;
    graceMonths: number;
    isCurrentSetting: boolean;
}
