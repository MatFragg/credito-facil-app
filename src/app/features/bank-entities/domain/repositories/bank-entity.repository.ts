import { Observable } from 'rxjs';
import { BankEntity } from '../models/bank-entity.model';

/**
 * Bank Entity Repository Interface (Contract)
 * Defines available operations for bank entities
 * Implementation is in the data layer
 */
export abstract class BankEntityRepository {
    abstract findAll(name?: string): Observable<BankEntity[]>;
    abstract findById(id: number): Observable<BankEntity>;
    abstract update(id: number, entity: Partial<BankEntity>): Observable<BankEntity>;
    abstract compare(ids: number[]): Observable<BankEntity[]>;
}
