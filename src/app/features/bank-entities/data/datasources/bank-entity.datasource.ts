import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BankEntityDto, BankEntityRequestDto } from '../dtos/bank-entity.dto';
import { ApiResponse } from '../../../../shared/models/base-api-response.dto';

/**
 * DataSource for Bank Entities API
 * Handles all HTTP communication with the backend
 */
@Injectable({ providedIn: 'root' })
export class BankEntityDataSource {
    private readonly basePath = `${environment.serverBaseUrl}/bank-entities`;

    constructor(private http: HttpClient) { }

    /**
     * Get all bank entities or search by name
     * @param name Optional search parameter
     * @returns Observable of API response with bank entities array
     */
    findAll(name?: string): Observable<ApiResponse<BankEntityDto[]>> {
        let params = new HttpParams();
        if (name && name.trim()) {
            params = params.set('name', name.trim());
        }

        return this.http.get<ApiResponse<BankEntityDto[]>>(this.basePath, { params });
    }

    /**
     * Get a single bank entity by ID
     * @param id Bank entity ID
     * @returns Observable of API response with single bank entity
     */
    findById(id: number): Observable<ApiResponse<BankEntityDto>> {
        return this.http.get<ApiResponse<BankEntityDto>>(`${this.basePath}/${id}`);
    }

    /**
     * Update a bank entity (ADMIN only)
     * @param id Bank entity ID
     * @param dto Update request DTO
     * @returns Observable of API response with updated bank entity
     */
    update(id: number, dto: BankEntityRequestDto): Observable<ApiResponse<BankEntityDto>> {
        return this.http.put<ApiResponse<BankEntityDto>>(`${this.basePath}/${id}`, dto);
    }

    /**
     * Compare multiple bank entities by their IDs
     * @param ids Array of bank entity IDs to compare
     * @returns Observable of API response with array of bank entities
     */
    compare(ids: number[]): Observable<ApiResponse<BankEntityDto[]>> {
        const params = new HttpParams().set('ids', ids.join(','));
        return this.http.get<ApiResponse<BankEntityDto[]>>(`${this.basePath}/comparisons`, { params });
    }
}
