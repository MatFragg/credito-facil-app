/**
 * Interest Rate Type Enum
 * Defines whether the interest rate is nominal or effective
 */
export enum InterestRateType {
    NOMINAL = 'NOMINAL',     // Tasa nominal (requires capitalization)
    EFFECTIVE = 'EFFECTIVE'  // Tasa efectiva (no capitalization needed)
}

/**
 * Interest Rate Type Display Labels
 */
export const InterestRateTypeLabels: Record<InterestRateType, string> = {
    [InterestRateType.NOMINAL]: 'Nominal',
    [InterestRateType.EFFECTIVE]: 'Efectiva'
};

/**
 * Check if rate type requires capitalization
 */
export function requiresCapitalization(rateType: InterestRateType): boolean {
    return rateType === InterestRateType.NOMINAL;
}
