import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientRepository } from '../repositories/client.repository';

/**
 * Use Case: Delete client
 * Removes a client from the system
 */
@Injectable()
export class DeleteClientUseCase {
    constructor(private repository: ClientRepository) { }

    execute(id: number): Observable<void> {
        if (!id || id <= 0) {
            throw new Error('Invalid client ID');
        }

        return this.repository.delete(id);
    }
}
