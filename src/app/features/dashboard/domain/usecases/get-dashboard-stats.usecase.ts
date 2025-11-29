import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardRepository } from '../repositories/dashboard.repository';
import { DashboardStats } from '../models/dashboard-stats.model';

/**
 * Use case for retrieving dashboard statistics.
 * Encapsulates the business logic for fetching and returning dashboard data.
 */
@Injectable()
export class GetDashboardStatsUseCase {

    constructor(private repository: DashboardRepository) { }

    /**
     * Executes the use case to get dashboard statistics
     * @returns Observable of DashboardStats
     */
    execute(): Observable<DashboardStats> {
        return this.repository.getStats();
    }
}
