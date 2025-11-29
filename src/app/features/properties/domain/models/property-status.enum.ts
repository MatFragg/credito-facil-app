/**
 * Property Status Enum
 * Matches backend PropertyStatus enum exactly
 */
export enum PropertyStatus {
    AVAILABLE = 'AVAILABLE',
    RESERVED = 'RESERVED',
    SOLD = 'SOLD'
}

/**
 * Property Status Display Labels (Spanish)
 */
export const PropertyStatusLabels: Record<PropertyStatus, string> = {
    [PropertyStatus.AVAILABLE]: 'Disponible',
    [PropertyStatus.RESERVED]: 'Reservada',
    [PropertyStatus.SOLD]: 'Vendida'
};

/**
 * Property Status Colors for badges
 */
export const PropertyStatusColors: Record<PropertyStatus, string> = {
    [PropertyStatus.AVAILABLE]: '#10b981',  // Green
    [PropertyStatus.RESERVED]: '#f59e0b',   // Amber
    [PropertyStatus.SOLD]: '#6b7280'        // Gray
};

/**
 * Get all property status options for dropdown
 */
export function getPropertyStatusOptions(): { value: PropertyStatus; label: string }[] {
    return Object.values(PropertyStatus).map(value => ({
        value,
        label: PropertyStatusLabels[value]
    }));
}
