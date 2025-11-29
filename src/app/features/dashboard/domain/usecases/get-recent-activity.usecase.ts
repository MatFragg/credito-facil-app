import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardRepository } from '../repositories/dashboard.repository';
import { Activity } from '../models/dashboard-stats.model';

/**
 * Use case for retrieving recent activity/events.
 */
@Injectable()
export class GetRecentActivityUseCase {

    constructor(private repository: DashboardRepository) { }

    /**
     * Executes the use case to get recent activity
     * @returns Observable of Activity array
     */
    execute(): Observable<Activity[]> {
        return this.repository.getRecentActivity();
    }
}
