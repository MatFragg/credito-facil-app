import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ApiResponse } from '../../../../shared/models/base-api-response.dto';
import { PropertyDto, PaginatedPropertiesDto } from '../dtos/property.dto';
import { CreatePropertyDto } from '../dtos/create-property.dto';
import { UpdatePropertyDto } from '../dtos/update-property.dto';

/**
 * Property Data Source
 * Handles HTTP requests to the properties API
 */
@Injectable({
    providedIn: 'root'
})
export class PropertyDataSource {
    private readonly apiUrl = `${environment.serverBaseUrl}/properties`;

    constructor(private http: HttpClient) { }

    /**
     * Get all properties with pagination (ADMIN)
     */
    getAll(page: number = 0, size: number = 20, sort: string = 'createdAt'): Observable<ApiResponse<PaginatedPropertiesDto>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', `${sort},desc`);

        return this.http.get<ApiResponse<PaginatedPropertiesDto>>(this.apiUrl, { params });
    }

    /**
     * Get my properties (logged in user)
     */
    getMyProperties(page: number = 0, size: number = 10): Observable<ApiResponse<PaginatedPropertiesDto>> {
        const params = new HttpParams()
            .set('page', page.toString())
            .set('size', size.toString())
            .set('sort', 'createdAt,desc');

        return this.http.get<ApiResponse<PaginatedPropertiesDto>>(`${this.apiUrl}/me`, { params });
    }

    /**
     * Get property by ID
     */
    getById(id: number): Observable<ApiResponse<PropertyDto>> {
        return this.http.get<ApiResponse<PropertyDto>>(`${this.apiUrl}/${id}`);
    }

    /**
     * Create new property without image
     */
    create(data: CreatePropertyDto): Observable<ApiResponse<PropertyDto>> {
        return this.http.post<ApiResponse<PropertyDto>>(this.apiUrl, data, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * Create new property with image (multipart)
     */
    createWithImage(data: CreatePropertyDto, image: File): Observable<ApiResponse<PropertyDto>> {
        const formData = new FormData();

        // Add property data as JSON blob
        formData.append('property', new Blob([JSON.stringify(data)], { type: 'application/json' }));

        // Add image file
        formData.append('image', image);

        return this.http.post<ApiResponse<PropertyDto>>(this.apiUrl, formData);
    }

    /**
     * Update property without changing image
     */
    update(id: number, data: UpdatePropertyDto): Observable<ApiResponse<PropertyDto>> {
        return this.http.put<ApiResponse<PropertyDto>>(`${this.apiUrl}/${id}`, data, {
            headers: { 'Content-Type': 'application/json' }
        });
    }

    /**
     * Update property with new image (multipart)
     */
    updateWithImage(id: number, data: UpdatePropertyDto, image: File): Observable<ApiResponse<PropertyDto>> {
        const formData = new FormData();

        // Add property data as JSON blob
        formData.append('property', new Blob([JSON.stringify(data)], { type: 'application/json' }));

        // Add image file
        formData.append('image', image);

        return this.http.put<ApiResponse<PropertyDto>>(`${this.apiUrl}/${id}`, formData);
    }

    /**
     * Update only the image
     */
    updateImage(id: number, image: File): Observable<ApiResponse<PropertyDto>> {
        const formData = new FormData();
        formData.append('image', image);

        return this.http.patch<ApiResponse<PropertyDto>>(`${this.apiUrl}/${id}/image`, formData);
    }

    /**
     * Delete property image
     */
    deleteImage(id: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}/image`);
    }

    /**
     * Delete property
     */
    delete(id: number): Observable<ApiResponse<void>> {
        return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
    }
}
