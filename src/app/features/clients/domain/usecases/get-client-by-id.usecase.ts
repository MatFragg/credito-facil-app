import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientRepository } from '../repositories/client.repository';
import { Client } from '../models/client.model';

/**
 * Use Case: Get client by ID
 * Retrieves a single client by their ID
 */
@Injectable()
export class GetClientByIdUseCase {
    constructor(private repository: ClientRepository) { }

    execute(id: number): Observable<Client> {
        return this.repository.getById(id);
    }
}
