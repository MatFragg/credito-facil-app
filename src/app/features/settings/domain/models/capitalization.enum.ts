/**
 * Capitalization Enum
 * Defines capitalization frequency for nominal interest rates
 * Only applicable when interestRateType is NOMINAL
 */
export enum Capitalization {
    DAILY = 'DAILY',
    FORTNIGHTLY = 'FORTNIGHTLY',
    MONTHLY = 'MONTHLY',
    BIMONTHLY = 'BIMONTHLY',
    TRIMESTERLY = 'TRIMESTERLY',
    QUARTERLY = 'QUARTERLY',
    SEMIANNUAL = 'SEMIANNUAL',
    YEARLY = 'YEARLY'
}

/**
 * Capitalization Display Labels (Spanish)
 */
export const CapitalizationLabels: Record<Capitalization, string> = {
    [Capitalization.DAILY]: 'Diaria',
    [Capitalization.FORTNIGHTLY]: 'Quincenal',
    [Capitalization.MONTHLY]: 'Mensual',
    [Capitalization.BIMONTHLY]: 'Bimestral',
    [Capitalization.TRIMESTERLY]: 'Trimestral',
    [Capitalization.QUARTERLY]: 'Cuatrimestral',
    [Capitalization.SEMIANNUAL]: 'Semestral',
    [Capitalization.YEARLY]: 'Anual'
};

/**
 * Get all capitalization options for dropdown
 */
export function getCapitalizationOptions(): { value: Capitalization; label: string }[] {
    return Object.values(Capitalization).map(value => ({
        value,
        label: CapitalizationLabels[value]
    }));
}
