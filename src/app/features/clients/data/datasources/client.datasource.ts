import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ClientDto, PaginatedClientDto } from '../dtos/client.dto';
import { CreateClientDto } from '../dtos/create-client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { ApiResponse } from '../../../../shared/models/base-api-response.dto';

/**
 * Client DataSource
 * Handles HTTP communication with the backend API
 */
@Injectable({
    providedIn: 'root'
})
export class ClientDataSource {
    private readonly apiUrl = `${environment.serverBaseUrl}/clients`;

    constructor(private http: HttpClient) { }

    /**
     * Get all clients with pagination
     */
    getAll(page: number = 0, size: number = 10, sort: string = 'createdAt'): Observable<ApiResponse<PaginatedClientDto>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', sort);

        return this.http.get<ApiResponse<PaginatedClientDto>>(this.apiUrl, { params });
    }

    /**
     * Get a client by ID
     */
    getById(id: number): Observable<ApiResponse<ClientDto>> {
        return this.http.get<ApiResponse<ClientDto>>(`${this.apiUrl}/${id}`);
    }

    /**
     * Search client by DNI
     */
    searchByDni(dni: string): Observable<ApiResponse<ClientDto>> {
        const params = new HttpParams().set('dni', dni);
        return this.http.get<ApiResponse<ClientDto>>(this.apiUrl, { params });
    }

    /**
     * Create a new client
     */
    create(data: CreateClientDto): Observable<ApiResponse<ClientDto>> {
        return this.http.post<ApiResponse<ClientDto>>(this.apiUrl, data);
    }

    /**
     * Update an existing client
     */
    update(id: number, data: UpdateClientDto): Observable<ApiResponse<ClientDto>> {
        return this.http.put<ApiResponse<ClientDto>>(`${this.apiUrl}/${id}`, data);
    }

    /**
     * Delete a client
     */
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
