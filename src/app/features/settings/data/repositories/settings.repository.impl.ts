import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingsRepository } from '../../domain/repositories/settings.repository';
import { Settings, CreateSettingsData, UpdateSettingsData, PaginatedSettings } from '../../domain/models/settings.model';
import { SettingsDataSource } from '../datasources/settings.datasource';
import { SettingsMapper } from '../mappers/settings.mapper';

/**
 * Settings Repository Implementation
 * Implements data access using datasource and mapper
 */
@Injectable()
export class SettingsRepositoryImpl extends SettingsRepository {
    constructor(private dataSource: SettingsDataSource) {
        super();
    }

    getCurrentSettings(): Observable<Settings> {
        return this.dataSource.getMySettings().pipe(
            map(response => SettingsMapper.toModel(response.data))
        );
    }

    getSettingsHistory(page: number = 0, size: number = 20, sort: string = 'createdAt'): Observable<PaginatedSettings> {
        return this.dataSource.getAll(page, size, sort).pipe(
            map(response => SettingsMapper.toPaginatedModel(response.data))
        );
    }

    getById(id: number): Observable<Settings> {
        return this.dataSource.getById(id).pipe(
            map(response => SettingsMapper.toModel(response.data))
        );
    }

    create(data: CreateSettingsData): Observable<Settings> {
        const dto = SettingsMapper.toCreateDto(data);
        return this.dataSource.create(dto).pipe(
            map(response => SettingsMapper.toModel(response.data))
        );
    }

    update(id: number, data: UpdateSettingsData): Observable<Settings> {
        const dto = SettingsMapper.toUpdateDto(data);
        return this.dataSource.update(id, dto).pipe(
            map(response => SettingsMapper.toModel(response.data))
        );
    }

    delete(id: number): Observable<void> {
        return this.dataSource.delete(id).pipe(
            map(() => undefined)
        );
    }
}
