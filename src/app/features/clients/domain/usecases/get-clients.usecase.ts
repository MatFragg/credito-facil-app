import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientRepository } from '../repositories/client.repository';
import { PaginatedClients } from '../models/client.model';

/**
 * Use Case: Get all clients with pagination
 * Retrieves paginated list of clients from the repository
 */
@Injectable()
export class GetClientsUseCase {
    constructor(private repository: ClientRepository) { }

    execute(page: number = 0, size: number = 10, sort: string = 'createdAt'): Observable<PaginatedClients> {
        return this.repository.getAll(page, size, sort);
    }
}
