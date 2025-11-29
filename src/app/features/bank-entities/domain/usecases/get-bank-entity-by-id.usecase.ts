import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankEntityRepository } from '../repositories/bank-entity.repository';
import { BankEntity } from '../models/bank-entity.model';

/**
 * Use case for retrieving a single bank entity by ID
 */
@Injectable()
export class GetBankEntityByIdUseCase {

    constructor(private repository: BankEntityRepository) { }

    /**
     * Executes the use case to get a bank entity by ID
     * @param id Bank entity ID
     * @returns Observable of BankEntity
     */
    execute(id: number): Observable<BankEntity> {
        if (!id) {
            throw new Error('Bank entity ID is required');
        }
        return this.repository.findById(id);
    }
}
