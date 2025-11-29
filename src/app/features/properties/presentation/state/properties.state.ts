import { Property, PaginatedProperties } from '../../domain/models/property.model';
import { PropertyType } from '../../domain/models/property-type.enum';
import { PropertyStatus } from '../../domain/models/property-status.enum';

/**
 * Property Filters Interface
 */
export interface PropertyFilters {
    search?: string;
    type?: PropertyType;
    status?: PropertyStatus;
    minPrice?: number;
    maxPrice?: number;
}

/**
 * Properties State Interface
 */
export interface PropertiesState {
    // Properties list
    properties: PaginatedProperties | null;

    // Current property (for detail/edit)
    currentProperty: Property | null;

    // Filters
    filters: PropertyFilters;

    // Loading states
    loading: boolean;
    saving: boolean;
    deleting: boolean;

    // Error state
    error: string | null;
}

/**
 * Initial state
 */
export const initialPropertiesState: PropertiesState = {
    properties: null,
    currentProperty: null,
    filters: {},
    loading: false,
    saving: false,
    deleting: false,
    error: null
};
