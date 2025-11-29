/**
 * Grace Period Type Enum
 * Defines the type of grace period for loan payments
 */
export enum GracePeriodType {
    NONE = 'NONE',      // No grace period
    TOTAL = 'TOTAL',    // Total grace period (no payments)
    PARTIAL = 'PARTIAL' // Partial grace period (interest only)
}

/**
 * Grace Period Type Display Labels (Spanish)
 */
export const GracePeriodTypeLabels: Record<GracePeriodType, string> = {
    [GracePeriodType.NONE]: 'Sin período de gracia',
    [GracePeriodType.TOTAL]: 'Período de gracia total',
    [GracePeriodType.PARTIAL]: 'Período de gracia parcial'
};

/**
 * Get all grace period type options for dropdown
 */
export function getGracePeriodTypeOptions(): { value: GracePeriodType; label: string }[] {
    return Object.values(GracePeriodType).map(value => ({
        value,
        label: GracePeriodTypeLabels[value]
    }));
}
