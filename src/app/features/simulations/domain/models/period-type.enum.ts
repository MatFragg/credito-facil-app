/**
 * Period Type Enum (for payment schedule)
 * Matches backend PeriodType enum
 */
export enum PeriodType {
    TOTAL_GRACE = 'TOTAL_GRACE',
    PARTIAL_GRACE = 'PARTIAL_GRACE',
    ORDINARY = 'ORDINARY'
}

/**
 * Period Type Display Labels (Spanish)
 */
export const PeriodTypeLabels: Record<PeriodType, string> = {
    [PeriodType.TOTAL_GRACE]: 'Gracia Total',
    [PeriodType.PARTIAL_GRACE]: 'Gracia Parcial',
    [PeriodType.ORDINARY]: 'Ordinario'
};

/**
 * Period Type Colors (for visual distinction)
 */
export const PeriodTypeColors: Record<PeriodType, string> = {
    [PeriodType.TOTAL_GRACE]: '#fbbf24',
    [PeriodType.PARTIAL_GRACE]: '#fb923c',
    [PeriodType.ORDINARY]: '#3b82f6'
};
