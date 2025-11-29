import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PropertyRepository } from '../repositories/property.repository';

/**
 * Use Case: Delete Property
 * Deletes a property with confirmation
 */
@Injectable()
export class DeletePropertyUseCase {
    constructor(private repository: PropertyRepository) { }

    execute(id: number): Observable<void> {
        if (!id || id <= 0) {
            throw new Error('Invalid property ID');
        }

        return this.repository.delete(id);
    }
}
