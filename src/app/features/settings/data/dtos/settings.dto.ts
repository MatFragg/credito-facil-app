/**
 * Settings Response DTO
 * Matches backend SettingsResponse
 */
export interface SettingsDto {
    id: number;
    userId: number;
    currency: string;
    language: string;
    interestRateType: string;
    capitalization: string | null;
    gracePeriodType: string;
    graceMonths: number;
    isCurrentSetting: boolean;
    createdAt: string;
}

/**
 * Paginated Settings Response
 */
export interface PaginatedSettingsDto {
    content: SettingsDto[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}
