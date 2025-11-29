import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankEntityRepository } from '../repositories/bank-entity.repository';
import { BankEntity } from '../models/bank-entity.model';

/**
 * Use case for retrieving all bank entities
 * Can optionally filter by name
 */
@Injectable()
export class GetAllBankEntitiesUseCase {

    constructor(private repository: BankEntityRepository) { }

    /**
     * Executes the use case to get all bank entities
     * @param name Optional search filter by bank name
     * @returns Observable of BankEntity array
     */
    execute(params?: { name?: string }): Observable<BankEntity[]> {
        if (!params) {
            return this.repository.findAll();
        }
        return this.repository.findAll(params.name);
    }
}
