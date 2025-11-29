import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankEntityRepository } from '../repositories/bank-entity.repository';
import { BankEntity } from '../models/bank-entity.model';

/**
 * 🎯 LEARNING CHALLENGE #4: Search & Filter Implementation
 * 
 * Use case for searching bank entities with filters
 * 
 * YOUR TASK:
 * 1. Add additional filter parameters (e.g., minRate, maxRate, minIncome)
 * 2. Implement complex filtering logic in this use case OR
 * 3. Pass parameters to repository and implement backend filtering
 * 
 * HINTS:
 * - You can filter locally using RxJS operators (map, filter)
 * - OR extend the backend endpoint to accept more query params
 * - Consider using a SearchCriteria interface for clean code
 * 
 * CURRENT IMPLEMENTATION:
 * - Only supports basic name search
 * - You need to add more sophisticated filtering
 */
@Injectable()
export class SearchBankEntitiesUseCase {

    constructor(private repository: BankEntityRepository) { }

    /**
     * TODO: Enhance this method with additional filter parameters
     * @param name Current basic search by name
     * @returns Observable of filtered BankEntity array
     */
    execute(name?: string): Observable<BankEntity[]> {
        // TODO: Add your filter logic here
        // Ideas:
        // - Filter by rate range
        // - Filter by minimum income requirement
        // - Filter by initial fee percentage
        // - Sort by different criteria

        return this.repository.findAll(name);
    }
}

/**
 * TODO (OPTIONAL): Create an interface for search criteria
 * 
 * Example:
 * interface BankEntitySearchCriteria {
 *   name?: string;
 *   minRate?: number;
 *   maxRate?: number;
 *   maxMinIncome?: number;
 *   sortBy?: 'rate' | 'income' | 'fee';
 *   sortOrder?: 'asc' | 'desc';
 * }
 */
