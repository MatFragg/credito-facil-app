/**
 * Property Type Enum
 * Matches backend PropertyType enum exactly
 */
export enum PropertyType {
    APARTMENT = 'APARTMENT',
    HOUSE = 'HOUSE',
    TOWNHOUSE = 'TOWNHOUSE',
    CONDOMINIUM = 'CONDOMINIUM',
    VILLA = 'VILLA',
    STUDIO = 'STUDIO',
    LOFT = 'LOFT',
    DUPLEX = 'DUPLEX',
    PENTHOUSE = 'PENTHOUSE',
    CABIN = 'CABIN',
    BUNGALOW = 'BUNGALOW',
    LAND = 'LAND'
}

/**
 * Property Type Display Labels (Spanish)
 */
export const PropertyTypeLabels: Record<PropertyType, string> = {
    [PropertyType.APARTMENT]: 'Departamento',
    [PropertyType.HOUSE]: 'Casa',
    [PropertyType.TOWNHOUSE]: 'Casa Adosada',
    [PropertyType.CONDOMINIUM]: 'Condominio',
    [PropertyType.VILLA]: 'Villa',
    [PropertyType.STUDIO]: 'Estudio',
    [PropertyType.LOFT]: 'Loft',
    [PropertyType.DUPLEX]: 'Duplex',
    [PropertyType.PENTHOUSE]: 'Penthouse',
    [PropertyType.CABIN]: 'Cabaña',
    [PropertyType.BUNGALOW]: 'Bungalow',
    [PropertyType.LAND]: 'Terreno'
};

/**
 * Get all property type options for dropdown
 */
export function getPropertyTypeOptions(): { value: PropertyType; label: string }[] {
    return Object.values(PropertyType).map(value => ({
        value,
        label: PropertyTypeLabels[value]
    }));
}
