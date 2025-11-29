import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../shared/models/base-api-response.dto';
import { SimulationDto, PaginatedSimulationsDto } from '../dtos/simulation.dto';
import { PaymentScheduleDto } from '../dtos/payment-schedule.dto';
import { CreateSimulationDto } from '../dtos/create-simulation.dto';
import { UpdateSimulationDto } from '../dtos/update-simulation.dto';

/**
 * Simulation Data Source
 * Handles HTTP requests to the simulations API
 */
@Injectable({
    providedIn: 'root'
})
export class SimulationDataSource {
    private readonly apiUrl = `${environment.serverBaseUrl}/simulations`;

    constructor(private http: HttpClient) { }

    /**
     * Calculate simulation preview (doesn't save)
     */
    calculatePreview(data: CreateSimulationDto): Observable<ApiResponse<SimulationDto>> {
        return this.http.post<ApiResponse<SimulationDto>>(`${this.apiUrl}/previews`, data);
    }

    /**
     * Save simulation to database
     */
    save(data: CreateSimulationDto): Observable<ApiResponse<SimulationDto>> {
        return this.http.post<ApiResponse<SimulationDto>>(this.apiUrl, data);
    }

    /**
     * Get all simulations with pagination (ADMIN)
     */
    getAll(page: number = 0, size: number = 20): Observable<ApiResponse<PaginatedSimulationsDto>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', 'createdAt,desc');

        return this.http.get<ApiResponse<PaginatedSimulationsDto>>(this.apiUrl, { params });
    }

    /**
     * Get my simulations (logged in user)
     */
    getMySimulations(page: number = 0, size: number = 10): Observable<ApiResponse<PaginatedSimulationsDto>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', 'createdAt,desc');

        return this.http.get<ApiResponse<PaginatedSimulationsDto>>(`${this.apiUrl}/me`, { params });
    }

    /**
     * Get simulation by ID
     */
    getById(id: number): Observable<ApiResponse<SimulationDto>> {
        return this.http.get<ApiResponse<SimulationDto>>(`${this.apiUrl}/${id}`);
    }

    /**
     * Get payment schedule for a simulation
     */
    getSchedule(id: number): Observable<ApiResponse<PaymentScheduleDto[]>> {
        return this.http.get<ApiResponse<PaymentScheduleDto[]>>(`${this.apiUrl}/${id}/schedule`);
    }

    /**
     * Update simulation
     */
    update(id: number, data: UpdateSimulationDto): Observable<ApiResponse<SimulationDto>> {
        return this.http.put<ApiResponse<SimulationDto>>(`${this.apiUrl}/${id}`, data);
    }

    /**
     * Delete simulation
     */
    delete(id: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }
}
