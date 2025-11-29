import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SimulationRepository } from '../../domain/repositories/simulation.repository';
import { Simulation, CreateSimulationData, UpdateSimulationData, PaginatedSimulations } from '../../domain/models/simulation.model';
import { PaymentSchedule } from '../../domain/models/payment-schedule.model';
import { SimulationDataSource } from '../datasources/simulation.datasource';
import { SimulationMapper } from '../mappers/simulation.mapper';

/**
 * Simulation Repository Implementation
 * Implements data access using datasource and mapper
 */
@Injectable()
export class SimulationRepositoryImpl extends SimulationRepository {
    constructor(private dataSource: SimulationDataSource) {
        super();
    }

    calculatePreview(data: CreateSimulationData): Observable<Simulation> {
        const dto = SimulationMapper.toCreateDto(data);
        return this.dataSource.calculatePreview(dto).pipe(
            map(response => SimulationMapper.toModel(response.data))
        );
    }

    save(data: CreateSimulationData): Observable<Simulation> {
        const dto = SimulationMapper.toCreateDto(data);
        return this.dataSource.save(dto).pipe(
            map(response => SimulationMapper.toModel(response.data))
        );
    }

    getAll(page: number = 0, size: number = 20): Observable<PaginatedSimulations> {
        return this.dataSource.getAll(page, size).pipe(
            map(response => SimulationMapper.toPaginatedModel(response.data))
        );
    }

    getMySimulations(page: number = 0, size: number = 10): Observable<PaginatedSimulations> {
        return this.dataSource.getMySimulations(page, size).pipe(
            map(response => SimulationMapper.toPaginatedModel(response.data))
        );
    }

    getById(id: number): Observable<Simulation> {
        return this.dataSource.getById(id).pipe(
            map(response => SimulationMapper.toModel(response.data))
        );
    }

    getSchedule(id: number): Observable<PaymentSchedule[]> {
        return this.dataSource.getSchedule(id).pipe(
            map(response => response.data.map(dto => SimulationMapper.toPaymentScheduleModel(dto)))
        );
    }

    update(id: number, data: UpdateSimulationData): Observable<Simulation> {
        const dto = SimulationMapper.toUpdateDto(data);
        return this.dataSource.update(id, dto).pipe(
            map(response => SimulationMapper.toModel(response.data))
        );
    }

    delete(id: number): Observable<void> {
        return this.dataSource.delete(id).pipe(
            map(() => undefined)
        );
    }
}
