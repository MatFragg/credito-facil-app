import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboardRepository } from '../../domain/repositories/dashboard.repository';
import { DashboardStats, Activity } from '../../domain/models/dashboard-stats.model';
import { DashboardAnalyticsDataSource } from '../datasources/dashboard-analytics.datasource';
import { dashboardStatsDtoToModel, activityDtoToModel } from '../mappers/dashboard-stats.mapper';

/**
 * Implementation of DashboardRepository.
 * Orchestrates datasource calls and DTO-to-Model mappings.
 */
@Injectable()
export class DashboardRepositoryImpl extends DashboardRepository {

    constructor(private datasource: DashboardAnalyticsDataSource) {
        super();
    }

    getStats(): Observable<DashboardStats> {
        return this.datasource.getStats().pipe(
            map(dto => dashboardStatsDtoToModel(dto))
        );
    }

    getRecentActivity(): Observable<Activity[]> {
        return this.datasource.getRecentActivity().pipe(
            map(dtos => dtos.map(activityDtoToModel))
        );
    }
}
