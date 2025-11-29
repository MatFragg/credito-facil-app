import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BankEntityRepository } from '../../domain/repositories/bank-entity.repository';
import { BankEntity } from '../../domain/models/bank-entity.model';
import { BankEntityDataSource } from '../datasources/bank-entity.datasource';
import { BankEntityMapper } from '../mappers/bank-entity.mapper';

/**
 * Implementation of BankEntityRepository
 * Orchestrates datasource calls and DTO-to-Model mappings
 */
@Injectable()
export class BankEntityRepositoryImpl extends BankEntityRepository {

    constructor(
        private datasource: BankEntityDataSource,
        private mapper: BankEntityMapper
    ) {
        super();
    }

    findAll(name?: string): Observable<BankEntity[]> {
        return this.datasource.findAll(name).pipe(
            map(response => this.mapper.toModelsArrayFromDto(response.data))
        );
    }

    findById(id: number): Observable<BankEntity> {
        return this.datasource.findById(id).pipe(
            map(response => this.mapper.toModelFromDto(response.data))
        );
    }

    update(id: number, entity: Partial<BankEntity>): Observable<BankEntity> {
        // Use full entity cast - validator in use case ensures all fields present
        const dto = this.mapper.toUpdateDtoFromModel(entity as BankEntity);
        return this.datasource.update(id, dto).pipe(
            map(response => this.mapper.toModelFromDto(response.data))
        );
    }

    compare(ids: number[]): Observable<BankEntity[]> {
        return this.datasource.compare(ids).pipe(
            map(response => this.mapper.toModelsArrayFromDto(response.data))
        );
    }
}
