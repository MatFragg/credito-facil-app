import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyRepository } from '../repositories/property.repository';
import { PaginatedProperties } from '../models/property.model';

/**
 * Use Case: Get Properties
 * Retrieves paginated properties list
 */
@Injectable()
export class GetPropertiesUseCase {
    constructor(private repository: PropertyRepository) { }

    execute(page: number = 0, size: number = 20): Observable<PaginatedProperties> {
        if (page < 0) {
            throw new Error('Page number cannot be negative');
        }

        if (size < 1 || size > 100) {
            throw new Error('Page size must be between 1 and 100');
        }

        return this.repository.getAll(page, size);
    }
}
