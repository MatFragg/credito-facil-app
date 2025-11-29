import { Observable } from 'rxjs';
import { DashboardStats, Activity } from '../models/dashboard-stats.model';

/**
 * Repository interface (contract) for dashboard data access.
 * Implementation is in the data layer.
 */
export abstract class DashboardRepository {
    /**
     * Fetches aggregated dashboard statistics
     */
    abstract getStats(): Observable<DashboardStats>;

    /**
     * Fetches recent activity/events
     */
    abstract getRecentActivity(): Observable<Activity[]>;
}
