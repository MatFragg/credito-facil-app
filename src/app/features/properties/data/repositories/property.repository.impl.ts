import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PropertyRepository } from '../../domain/repositories/property.repository';
import { Property, CreatePropertyData, UpdatePropertyData, PaginatedProperties } from '../../domain/models/property.model';
import { PropertyDataSource } from '../datasources/property.datasource';
import { PropertyMapper } from '../mappers/property.mapper';

/**
 * Property Repository Implementation
 * Implements data access using datasource and mapper
 */
@Injectable()
export class PropertyRepositoryImpl extends PropertyRepository {
    constructor(private dataSource: PropertyDataSource) {
        super();
    }

    getAll(page: number = 0, size: number = 20, sort: string = 'createdAt'): Observable<PaginatedProperties> {
        return this.dataSource.getAll(page, size, sort).pipe(
            map(response => PropertyMapper.toPaginatedModel(response.data))
        );
    }

    getMyProperties(page: number = 0, size: number = 10): Observable<PaginatedProperties> {
        return this.dataSource.getMyProperties(page, size).pipe(
            map(response => PropertyMapper.toPaginatedModel(response.data))
        );
    }

    getById(id: number): Observable<Property> {
        return this.dataSource.getById(id).pipe(
            map(response => PropertyMapper.toModel(response.data))
        );
    }

    create(data: CreatePropertyData): Observable<Property> {
        const dto = PropertyMapper.toCreateDto(data);

        if (data.image) {
            return this.dataSource.createWithImage(dto, data.image).pipe(
                map(response => PropertyMapper.toModel(response.data))
            );
        } else {
            return this.dataSource.create(dto).pipe(
                map(response => PropertyMapper.toModel(response.data))
            );
        }
    }

    update(id: number, data: UpdatePropertyData): Observable<Property> {
        const dto = PropertyMapper.toUpdateDto(data);

        if (data.image) {
            return this.dataSource.updateWithImage(id, dto, data.image).pipe(
                map(response => PropertyMapper.toModel(response.data))
            );
        } else {
            return this.dataSource.update(id, dto).pipe(
                map(response => PropertyMapper.toModel(response.data))
            );
        }
    }

    updateImage(id: number, image: File): Observable<Property> {
        return this.dataSource.updateImage(id, image).pipe(
            map(response => PropertyMapper.toModel(response.data))
        );
    }

    deleteImage(id: number): Observable<void> {
        return this.dataSource.deleteImage(id).pipe(
            map(() => undefined)
        );
    }

    delete(id: number): Observable<void> {
        return this.dataSource.delete(id).pipe(
            map(() => undefined)
        );
    }
}
