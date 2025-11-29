import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyRepository } from '../repositories/property.repository';
import { Property, CreatePropertyData } from '../models/property.model';
import { PropertyType } from '../models/property-type.enum';
import { PropertyStatus } from '../models/property-status.enum';

/**
 * Use Case: Create Property
 * Creates new property with business validation
 */
@Injectable()
export class CreatePropertyUseCase {
    constructor(private repository: PropertyRepository) { }

    execute(data: CreatePropertyData): Observable<Property> {
        // Business validation
        this.validateProperty(data);

        return this.repository.create(data);
    }

    private validateProperty(data: CreatePropertyData): void {
        // Validate client ID
        if (!data.clientId || data.clientId <= 0) {
            throw new Error('Client ID is required and must be valid');
        }

        // Validate property type
        if (!Object.values(PropertyType).includes(data.propertyType)) {
            throw new Error('Invalid property type');
        }

        // Validate price
        if (!data.price || data.price <= 0) {
            throw new Error('Price must be greater than 0');
        }

        // Validate area if provided
        if (data.area !== undefined && data.area <= 0) {
            throw new Error('Area must be greater than 0');
        }

        // Validate bedrooms if provided
        if (data.bedrooms !== undefined && data.bedrooms < 0) {
            throw new Error('Bedrooms cannot be negative');
        }

        // Validate bathrooms if provided
        if (data.bathrooms !== undefined && data.bathrooms < 0) {
            throw new Error('Bathrooms cannot be negative');
        }

        // Validate parking spaces if provided
        if (data.parkingSpaces !== undefined && data.parkingSpaces < 0) {
            throw new Error('Parking spaces cannot be negative');
        }

        // Validate age if provided
        if (data.ageYears !== undefined && data.ageYears < 0) {
            throw new Error('Age cannot be negative');
        }

        // Validate image file if provided
        if (data.image) {
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (data.image.size > maxSize) {
                throw new Error('Image file size cannot exceed 5MB');
            }

            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(data.image.type)) {
                throw new Error('Only JPEG, PNG, and WebP images are allowed');
            }
        }
    }
}
