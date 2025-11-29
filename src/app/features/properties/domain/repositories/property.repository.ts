import { Observable } from 'rxjs';
import { Property, CreatePropertyData, UpdatePropertyData, PaginatedProperties } from '../models/property.model';

/**
 * Property Repository Interface
 * Abstract repository for property data access
 */
export abstract class PropertyRepository {
    /**
     * Get all properties with pagination
     */
    abstract getAll(page: number, size: number, sort?: string): Observable<PaginatedProperties>;

    /**
     * Get my properties (logged in user)
     */
    abstract getMyProperties(page: number, size: number): Observable<PaginatedProperties>;

    /**
     * Get property by ID
     */
    abstract getById(id: number): Observable<Property>;

    /**
     * Create new property
     */
    abstract create(data: CreatePropertyData): Observable<Property>;

    /**
     * Update property
     */
    abstract update(id: number, data: UpdatePropertyData): Observable<Property>;

    /**
     * Update property image only
     */
    abstract updateImage(id: number, image: File): Observable<Property>;

    /**
     * Delete property image
     */
    abstract deleteImage(id: number): Observable<void>;

    /**
     * Delete property
     */
    abstract delete(id: number): Observable<void>;
}
