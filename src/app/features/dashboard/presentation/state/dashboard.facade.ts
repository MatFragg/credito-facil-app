import { Injectable, signal, computed } from '@angular/core';
import { take } from 'rxjs/operators';
import { DashboardState, initialDashboardState } from './dashboard.state';
import { GetDashboardStatsUseCase } from '../../domain/usecases/get-dashboard-stats.usecase';
import { GetRecentActivityUseCase } from '../../domain/usecases/get-recent-activity.usecase';
import { StatCardData } from '../../domain/models/dashboard.models';

/**
 * Dashboard Facade - Manages dashboard state using Angular Signals.
 * Orchestrates use cases and provides a simplified interface for components.
 */
@Injectable()
export class DashboardFacade {
    // Private state signal
    private state = signal<DashboardState>(initialDashboardState);

    // Public computed signals for components
    stats = computed(() => this.state().stats);
    activity = computed(() => this.state().activity);
    loading = computed(() => this.state().loading);
    error = computed(() => this.state().error);

    // Computed signal to transform stats into StatCardData array
    statCards = computed<StatCardData[]>(() => {
        const stats = this.stats();
        if (!stats) return [];

        return [
            {
                label: 'Total Clientes',
                value: stats.clientes.total.toLocaleString(),
                delta: `+${stats.clientes.crecimientoMensual}%`,
                deltaText: 'vs mes anterior',
                iconName: 'group',
                iconBgClass: 'blue-bg'
            },
            {
                label: 'Viviendas Disponibles',
                value: stats.viviendas.disponibles,
                delta: `+${stats.viviendas.nuevasEstaSemana}`,
                deltaText: 'nuevas propiedades',
                iconName: 'domain',
                iconBgClass: 'lightgreen-bg'
            },
            {
                label: 'Simulaciones Hoy',
                value: stats.simulaciones.totalHoy,
                delta: `+${stats.simulaciones.crecimientoHoy}%`,
                deltaText: 'vs ayer',
                iconName: 'calculate',
                iconBgClass: 'yellow-bg'
            },
            {
                label: 'Monto Promedio',
                value: `S/ ${(stats.simulaciones.montoPromedio / 1000).toFixed(0)}K`,
                delta: `+${stats.simulaciones.crecimientoPromedio}%`,
                deltaText: 'vs promedio',
                iconName: 'timeline',
                iconBgClass: 'purple-bg'
            }
        ];
    });

    constructor(
        private getDashboardStatsUseCase: GetDashboardStatsUseCase,
        private getRecentActivityUseCase: GetRecentActivityUseCase
    ) { }

    /**
     * Loads dashboard statistics
     */
    loadStats(): void {
        this.updateState({ loading: true, error: null });

        this.getDashboardStatsUseCase.execute()
            .pipe(take(1))
            .subscribe({
                next: (stats) => {
                    this.updateState({ stats, loading: false });
                },
                error: (error) => {
                    console.error('Error loading dashboard stats:', error);
                    this.updateState({
                        error: 'Error al cargar estadísticas del dashboard',
                        loading: false
                    });
                }
            });
    }

    /**
     * Loads recent activity
     */
    loadActivity(): void {
        this.getRecentActivityUseCase.execute()
            .pipe(take(1))
            .subscribe({
                next: (activity) => {
                    this.updateState({ activity });
                },
                error: (error) => {
                    console.error('Error loading recent activity:', error);
                }
            });
    }

    /**
     * Loads all dashboard data (stats + activity)
     */
    loadAll(): void {
        this.loadStats();
        this.loadActivity();
    }

    /**
     * Refreshes all dashboard data
     */
    refresh(): void {
        this.loadAll();
    }

    /**
     * Updates the state signal with partial state
     */
    private updateState(partialState: Partial<DashboardState>): void {
        this.state.update(state => ({ ...state, ...partialState }));
    }
}
