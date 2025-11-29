/**
 * Create Property Request DTO
 * Matches backend PropertyRequest
 */
export interface CreatePropertyDto {
    clientId: number;
    propertyName?: string;
    projectName?: string;
    propertyType: string;
    price: number;
    area?: number;
    bedrooms?: number;
    bathrooms?: number;
    parkingSpaces?: number;
    ageYears?: number;
    address?: string;
    district?: string;
    province?: string;
    city?: string;
    status?: string;
    description?: string;
}
