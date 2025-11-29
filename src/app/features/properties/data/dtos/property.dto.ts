/**
 * Property Response DTO
 * Matches backend PropertyResponse
 */
export interface PropertyDto {
    id: number;
    clientId: number;
    propertyName: string;
    projectName: string;
    propertyCode: string;
    propertyType: string;
    price: number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpaces: number;
    ageYears: number;
    address: string;
    district: string;
    province: string;
    city: string;
    status: string;
    imageUrl: string | null;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

/**
 * Paginated Properties Response
 */
export interface PaginatedPropertiesDto {
    content: PropertyDto[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}
