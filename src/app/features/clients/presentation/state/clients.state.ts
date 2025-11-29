import { Client, PaginatedClients } from '../../domain/models/client.model';

/**
 * Clients feature state interface
 * Manages the state of the clients feature
 */
export interface ClientsState {
    // Data
    clients: Client[];
    selectedClient: Client | null;
    paginationInfo: PaginationInfo | null;

    // Loading states
    loading: boolean;
    creating: boolean;
    updating: boolean;
    deleting: boolean;

    // Error state
    error: string | null;

    // Search state
    searchQuery: string;

    // Stats
    stats: ClientStats;
}

/**
 * Pagination information
 */
export interface PaginationInfo {
    currentPage: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
    isFirst: boolean;
    isLast: boolean;
}

/**
 * Client statistics for stat cards
 */
export interface ClientStats {
    total: number;
    averageIncome: number;
    newThisMonth: number;
    withSimulations: number;
}

/**
 * Initial state
 */
export const initialClientsState: ClientsState = {
    clients: [],
    selectedClient: null,
    paginationInfo: null,
    loading: false,
    creating: false,
    updating: false,
    deleting: false,
    error: null,
    searchQuery: '',
    stats: {
        total: 0,
        averageIncome: 0,
        newThisMonth: 0,
        withSimulations: 0
    }
};
