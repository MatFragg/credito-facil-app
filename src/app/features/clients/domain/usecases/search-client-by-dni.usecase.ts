import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientRepository } from '../repositories/client.repository';
import { Client } from '../models/client.model';

/**
 * Use Case: Search client by DNI
 * Finds a client using their DNI number
 */
@Injectable()
export class SearchClientByDniUseCase {
    constructor(private repository: ClientRepository) { }

    execute(dni: string): Observable<Client> {
        // Validate DNI format (8 digits)
        if (!dni || !/^\d{8}$/.test(dni)) {
            throw new Error('DNI must be 8 digits');
        }

        return this.repository.searchByDni(dni);
    }
}
