import { Observable } from 'rxjs';
import { Client, CreateClientData, UpdateClientData, PaginatedClients } from '../models/client.model';

/**
 * Client Repository Interface
 * Defines operations for client data access
 * Implementation in data layer
 */
export abstract class ClientRepository {
    /**
     * Get all clients with pagination
     */
    abstract getAll(page?: number, size?: number, sort?: string): Observable<PaginatedClients>;

    /**
     * Get a client by ID
     */
    abstract getById(id: number): Observable<Client>;

    /**
     * Search client by DNI
     */
    abstract searchByDni(dni: string): Observable<Client>;

    /**
     * Create a new client
     */
    abstract create(data: CreateClientData): Observable<Client>;

    /**
     * Update an existing client
     */
    abstract update(id: number, data: UpdateClientData): Observable<Client>;

    /**
     * Delete a client
     */
    abstract delete(id: number): Observable<void>;
}
