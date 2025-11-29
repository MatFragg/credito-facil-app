import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientRepository } from '../repositories/client.repository';
import { Client, UpdateClientData } from '../models/client.model';

/**
 * Use Case: Update existing client
 * Updates client information with validation
 */
@Injectable()
export class UpdateClientUseCase {
    constructor(private repository: ClientRepository) { }

    execute(id: number, data: UpdateClientData): Observable<Client> {
        // Business validation
        if (!data.firstName || data.firstName.trim().length === 0) {
            throw new Error('First name is required');
        }

        // Validate DNI format if provided
        if (data.dni && !/^\d{8}$/.test(data.dni)) {
            throw new Error('DNI must be 8 digits');
        }

        // Validate phone format if provided
        if (data.phone && !/^\d{9}$/.test(data.phone)) {
            throw new Error('Phone number must be 9 digits');
        }

        // Validate email format if provided
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            throw new Error('Invalid email format');
        }

        return this.repository.update(id, data);
    }
}
