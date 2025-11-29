import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankEntityRepository } from '../repositories/bank-entity.repository';
import { BankEntity } from '../models/bank-entity.model';

/**
 * Use case for comparing multiple bank entities
 * Retrieves multiple entities by their IDs for side-by-side comparison
 */
@Injectable()
export class CompareBankEntitiesUseCase {

    constructor(private repository: BankEntityRepository) { }

    /**
     * Executes the use case to compare bank entities
     * @param ids Array of bank entity IDs to compare (2-3 recommended)
     * @returns Observable of BankEntity array
     */
    execute(ids: number[]): Observable<BankEntity[]> {
        if (ids.length === 0) {
            throw new Error('At least one bank entity ID is required for comparison');
        }
        return this.repository.compare(ids);
    }
}
