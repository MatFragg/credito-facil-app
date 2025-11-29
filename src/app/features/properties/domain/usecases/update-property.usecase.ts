import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyRepository } from '../repositories/property.repository';
import { Property, UpdatePropertyData } from '../models/property.model';
import { PropertyType } from '../models/property-type.enum';

/**
 * Use Case: Update Property
 * Updates existing property with business validation
 */
@Injectable()
export class UpdatePropertyUseCase {
    constructor(private repository: PropertyRepository) { }

    execute(id: number, data: UpdatePropertyData): Observable<Property> {
        // Validate ID
        if (!id || id <= 0) {
            throw new Error('Invalid property ID');
        }

        // Business validation (reuse same validation logic as create)
        this.validateProperty(data);

        return this.repository.update(id, data);
    }

    private validateProperty(data: UpdatePropertyData): void {
        if (!data.clientId || data.clientId <= 0) {
            throw new Error('Client ID is required and must be valid');
        }

        if (!Object.values(PropertyType).includes(data.propertyType)) {
            throw new Error('Invalid property type');
        }

        if (!data.price || data.price <= 0) {
            throw new Error('Price must be greater than 0');
        }

        if (data.area !== undefined && data.area <= 0) {
            throw new Error('Area must be greater than 0');
        }

        if (data.bedrooms !== undefined && data.bedrooms < 0) {
            throw new Error('Bedrooms cannot be negative');
        }

        if (data.bathrooms !== undefined && data.bathrooms < 0) {
            throw new Error('Bathrooms cannot be negative');
        }

        if (data.parkingSpaces !== undefined && data.parkingSpaces < 0) {
            throw new Error('Parking spaces cannot be negative');
        }

        if (data.ageYears !== undefined && data.ageYears < 0) {
            throw new Error('Age cannot be negative');
        }

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
