import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { DashboardStatsDto } from '../dtos/dashboard-stats.dto';
import { ActivityDto } from '../dtos/activity.dto';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardAnalyticsDataSource {
    private readonly serverBaseUrl = `${environment.serverBaseUrl}/dashboard`;

    constructor(private http: HttpClient) { }

    /**
     * Fetches dashboard statistics from backend.
     * Currently returns mock data - replace with real HTTP call when backend is ready:
     * return this.http.get<DashboardStatsDto>(`${this.serverBaseUrl}/stats`);
     */
    getStats(): Observable<DashboardStatsDto> {
        // Mock data for now
        const mockStats: DashboardStatsDto = {
            clientes: {
                total: 1247,
                nuevosEsteMes: 43,
                crecimientoMensual: 12
            },
            viviendas: {
                total: 89,
                disponibles: 62,
                nuevasEstaSemana: 5
            },
            simulaciones: {
                totalHoy: 34,
                crecimientoHoy: 8,
                montoPromedio: 285000,
                crecimientoPromedio: 3
            }
        };

        // Simulate network delay
        return of(mockStats).pipe(delay(500));

        // When backend is ready, replace above with:
        // return this.http.get<DashboardStatsDto>(`${this.apiUrl}/stats`);
    }

    /**
     * Fetches recent activity from backend.
     * Currently returns mock data - replace with real HTTP call when backend is ready.
     */
    getRecentActivity(): Observable<ActivityDto[]> {
        const mockActivity: ActivityDto[] = [
            {
                id: '1',
                tipo: 'cliente',
                descripcion: 'Nuevo cliente registrado: María González',
                fecha: new Date().toISOString(),
                usuario: 'admin'
            },
            {
                id: '2',
                tipo: 'simulacion',
                descripcion: 'Simulación completada para Casa en Los Olivos',
                fecha: new Date(Date.now() - 3600000).toISOString(),
                usuario: 'vendedor1'
            },
            {
                id: '3',
                tipo: 'vivienda',
                descripcion: 'Nueva vivienda añadida: Depto en San Miguel',
                fecha: new Date(Date.now() - 7200000).toISOString(),
                usuario: 'admin'
            }
        ];

        return of(mockActivity).pipe(delay(300));

        // When backend is ready, replace above with:
        // return this.http.get<ActivityDto[]>(`${this.apiUrl}/activity`);
    }
}
