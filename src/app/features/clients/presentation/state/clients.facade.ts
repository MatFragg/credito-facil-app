import { Injectable, signal, computed } from '@angular/core';
import { take } from 'rxjs/operators';
import { ClientsState, initialClientsState, PaginationInfo, ClientStats } from './clients.state';
import { Client, CreateClientData, UpdateClientData } from '../../domain/models/client.model';
import { GetClientsUseCase } from '../../domain/usecases/get-clients.usecase';
import { GetClientByIdUseCase } from '../../domain/usecases/get-client-by-id.usecase';
import { SearchClientByDniUseCase } from '../../domain/usecases/search-client-by-dni.usecase';
import { CreateClientUseCase } from '../../domain/usecases/create-client.usecase';
import { UpdateClientUseCase } from '../../domain/usecases/update-client.usecase';
import { DeleteClientUseCase } from '../../domain/usecases/delete-client.usecase';

/**
 * Clients Facade
 * Manages state and orchestrates use cases for the clients feature
 */
@Injectable()
export class ClientsFacade {
    // State signal
    private state = signal<ClientsState>(initialClientsState);

    // Computed selectors
    clients = computed(() => this.state().clients);
    selectedClient = computed(() => this.state().selectedClient);
    paginationInfo = computed(() => this.state().paginationInfo);
    loading = computed(() => this.state().loading);
    creating = computed(() => this.state().creating);
    updating = computed(() => this.state().updating);
    deleting = computed(() => this.state().deleting);
    error = computed(() => this.state().error);
    searchQuery = computed(() => this.state().searchQuery);
    stats = computed(() => this.state().stats);

    constructor(
        private getClientsUseCase: GetClientsUseCase,
        private getClientByIdUseCase: GetClientByIdUseCase,
        private searchClientByDniUseCase: SearchClientByDniUseCase,
        private createClientUseCase: CreateClientUseCase,
        private updateClientUseCase: UpdateClientUseCase,
        private deleteClientUseCase: DeleteClientUseCase
    ) { }

    /**
     * Load all clients with pagination
     */
    loadAll(page: number = 0, size: number = 10, sort: string = 'createdAt'): void {
        this.updateState({ loading: true, error: null });

        this.getClientsUseCase.execute(page, size, sort)
            .pipe(take(1))
            .subscribe({
                next: (result) => {
                    const paginationInfo: PaginationInfo = {
                        currentPage: result.number,
                        pageSize: result.size,
                        totalElements: result.totalElements,
                        totalPages: result.totalPages,
                        isFirst: result.first,
                        isLast: result.last
                    };

                    const stats = this.calculateStats(result.content, result.totalElements);

                    this.updateState({
                        clients: result.content,
                        paginationInfo,
                        stats,
                        loading: false
                    });
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Error loading clients',
                        loading: false
                    });
                }
            });
    }

    /**
     * Load a client by ID
     */
    loadById(id: number): void {
        this.updateState({ loading: true, error: null });

        this.getClientByIdUseCase.execute(id)
            .pipe(take(1))
            .subscribe({
                next: (client) => {
                    this.updateState({
                        selectedClient: client,
                        loading: false
                    });
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Error loading client',
                        loading: false
                    });
                }
            });
    }

    /**
     * Search client by DNI
     */
    searchByDni(dni: string): void {
        this.updateState({ loading: true, error: null, searchQuery: dni });

        this.searchClientByDniUseCase.execute(dni)
            .pipe(take(1))
            .subscribe({
                next: (client) => {
                    this.updateState({
                        clients: [client],
                        paginationInfo: {
                            currentPage: 0,
                            pageSize: 1,
                            totalElements: 1,
                            totalPages: 1,
                            isFirst: true,
                            isLast: true
                        },
                        loading: false
                    });
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Client not found',
                        loading: false
                    });
                }
            });
    }

    /**
     * Clear search and reload all clients
     */
    clearSearch(): void {
        this.updateState({ searchQuery: '' });
        this.loadAll();
    }

    /**
     * Create a new client
     */
    create(data: CreateClientData): void {
        this.updateState({ creating: true, error: null });

        this.createClientUseCase.execute(data)
            .pipe(take(1))
            .subscribe({
                next: (client) => {
                    this.updateState({ creating: false });
                    // Reload the list after creation
                    this.loadAll();
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Error creating client',
                        creating: false
                    });
                }
            });
    }

    /**
     * Update an existing client
     */
    update(id: number, data: UpdateClientData): void {
        this.updateState({ updating: true, error: null });

        this.updateClientUseCase.execute(id, data)
            .pipe(take(1))
            .subscribe({
                next: (client) => {
                    this.updateState({ updating: false });
                    // Reload the list after update
                    this.loadAll();
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Error updating client',
                        updating: false
                    });
                }
            });
    }

    /**
     * Delete a client
     */
    delete(id: number): void {
        this.updateState({ deleting: true, error: null });

        this.deleteClientUseCase.execute(id)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.updateState({ deleting: false });
                    // Reload the list after deletion
                    this.loadAll();
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Error deleting client',
                        deleting: false
                    });
                }
            });
    }

    /**
     * Set selected client
     */
    selectClient(client: Client | null): void {
        this.updateState({ selectedClient: client });
    }

    /**
     * Clear error
     */
    clearError(): void {
        this.updateState({ error: null });
    }

    /**
     * Calculate statistics from clients data
     */
    private calculateStats(clients: Client[], total: number): ClientStats {
        const now = new Date();
        const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        const newThisMonth = clients.filter(c =>
            c.createdAt >= firstDayOfMonth
        ).length;

        const totalIncome = clients.reduce((sum, c) =>
            sum + (c.monthlyIncome || 0), 0
        );
        const averageIncome = clients.length > 0 ? totalIncome / clients.length : 0;

        // TODO: withSimulations requires integration with simulations feature
        const withSimulations = 0;

        return {
            total,
            averageIncome,
            newThisMonth,
            withSimulations
        };
    }

    /**
     * Update state helper
     */
    private updateState(partial: Partial<ClientsState>): void {
        this.state.update(current => ({ ...current, ...partial }));
    }
}
