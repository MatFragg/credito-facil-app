import { DashboardStats, Activity } from '../../domain/models/dashboard-stats.model';

/**
 * Dashboard state interface defining the shape of the dashboard state
 */
export interface DashboardState {
    stats: DashboardStats | null;
    activity: Activity[];
    loading: boolean;
    error: string | null;
}

/**
 * Initial state for the dashboard
 */
export const initialDashboardState: DashboardState = {
    stats: null,
    activity: [],
    loading: false,
    error: null
};
