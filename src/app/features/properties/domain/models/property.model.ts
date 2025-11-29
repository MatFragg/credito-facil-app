import { PropertyType } from './property-type.enum';
import { PropertyStatus } from './property-status.enum';

/**
 * Property Domain Model
 */
export interface Property {
    id: number;
    clientId: number;
    propertyName: string;
    projectName: string;
    propertyCode: string;
    propertyType: PropertyType;
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
    status: PropertyStatus;
    imageUrl: string | null;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Data for creating new property
 */
export interface CreatePropertyData {
    clientId: number;
    propertyName?: string;
    projectName?: string;
    propertyType: PropertyType;
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
    status?: PropertyStatus;
    description?: string;
    image?: File;
}

/**
 * Data for updating property
 */
export interface UpdatePropertyData {
    clientId: number;
    propertyName?: string;
    projectName?: string;
    propertyType: PropertyType;
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
    status?: PropertyStatus;
    description?: string;
    image?: File;
}

/**
 * Paginated Properties
 */
export interface PaginatedProperties {
    content: Property[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

/**
 * Property Helper Functions
 */
export class PropertyHelpers {
    /**
     * Get full address
     */
    static getFullAddress(property: Property): string {
        const parts = [property.address, property.district, property.province, property.city]
            .filter(part => part && part.trim());
        return parts.join(', ');
    }

    /**
     * Format price
     */
    static formatPrice(price: number): string {
        return `S/ ${price.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }

    /**
     * Get property summary (type • bedrooms • area)
     */
    static getSummary(property: Property): string {
        const typeName = property.propertyType === PropertyType.HOUSE ? 'Casa' :
            property.propertyType === PropertyType.APARTMENT ? 'Departamento' : 'Duplex';
        return `${typeName} • ${property.bedrooms} dormitorios • ${property.area} m²`;
    }
}
