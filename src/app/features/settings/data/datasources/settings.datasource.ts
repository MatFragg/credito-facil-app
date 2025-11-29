import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../shared/models/base-api-response.dto';
import { SettingsDto, PaginatedSettingsDto } from '../dtos/settings.dto';
import { CreateSettingsDto } from '../dtos/create-settings.dto';
import { UpdateSettingsDto } from '../dtos/update-settings.dto';

/**
 * Settings Data Source
 * Handles HTTP requests to the settings API
 */
@Injectable({
    providedIn: 'root'
})
export class SettingsDataSource {
    private readonly apiUrl = `${environment.serverBaseUrl}/settings`;

    constructor(private http: HttpClient) { }

    /**
     * Get current user's settings
     */
    getMySettings(): Observable<ApiResponse<SettingsDto>> {
        return this.http.get<ApiResponse<SettingsDto>>(`${this.apiUrl}/me`);
    }

    /**
     * Get settings history with pagination
     */
    getAll(page: number = 0, size: number = 20, sort: string = 'createdAt'): Observable<ApiResponse<PaginatedSettingsDto>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', `${sort},desc`);

        return this.http.get<ApiResponse<PaginatedSettingsDto>>(this.apiUrl, { params });
    }

    /**
     * Get settings by ID
     */
    getById(id: number): Observable<ApiResponse<SettingsDto>> {
        return this.http.get<ApiResponse<SettingsDto>>(`${this.apiUrl}/${id}`);
    }

    /**
     * Create new settings
     */
    create(data: CreateSettingsDto): Observable<ApiResponse<SettingsDto>> {
        return this.http.post<ApiResponse<SettingsDto>>(this.apiUrl, data);
    }

    /**
     * Update existing settings
     */
    update(id: number, data: UpdateSettingsDto): Observable<ApiResponse<SettingsDto>> {
        return this.http.put<ApiResponse<SettingsDto>>(`${this.apiUrl}/${id}`, data);
    }

    /**
     * Delete settings
     */
    delete(id: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }
}
