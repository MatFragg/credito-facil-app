import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientRepository } from '../../domain/repositories/client.repository';
import { Client, CreateClientData, UpdateClientData, PaginatedClients } from '../../domain/models/client.model';
import { ClientDataSource } from '../datasources/client.datasource';
import { ClientMapper } from '../mappers/client.mapper';

/**
 * Client Repository Implementation
 * Orchestrates DataSource and Mapper to provide domain models
 */
@Injectable()
export class ClientRepositoryImpl extends ClientRepository {
    constructor(private dataSource: ClientDataSource) {
        super();
    }

    getAll(page: number = 0, size: number = 10, sort: string = 'createdAt'): Observable<PaginatedClients> {
        return this.dataSource.getAll(page, size, sort).pipe(
            map(response => ClientMapper.toPaginatedModel(response.data))
        );
    }

    getById(id: number): Observable<Client> {
        return this.dataSource.getById(id).pipe(
            map(response => ClientMapper.toModel(response.data))
        );
    }

    searchByDni(dni: string): Observable<Client> {
        return this.dataSource.searchByDni(dni).pipe(
            map(response => ClientMapper.toModel(response.data))
        );
    }

    create(data: CreateClientData): Observable<Client> {
        const dto = ClientMapper.toCreateDto(data);
        return this.dataSource.create(dto).pipe(
            map(response => ClientMapper.toModel(response.data))
        );
    }

    update(id: number, data: UpdateClientData): Observable<Client> {
        const dto = ClientMapper.toUpdateDto(data);
        return this.dataSource.update(id, dto).pipe(
            map(response => ClientMapper.toModel(response.data))
        );
    }

    delete(id: number): Observable<void> {
        return this.dataSource.delete(id);
    }
}
