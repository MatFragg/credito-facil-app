import { EvaluationStatus } from './evaluation-status.enum';

/**
 * Domain model for Client
 * Represents a potential buyer (prospecto) in the system
 */
export interface Client {
    id: number;
    userId: number;
    firstName: string;
    lastName: string | null;
    dni: string | null;
    phone: string | null;
    email: string | null;
    monthlyIncome: number | null;
    occupation: string | null;
    evaluationStatus: EvaluationStatus;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}

/**
 * Client creation data
 */
export interface CreateClientData {
    firstName: string;
    lastName?: string;
    dni?: string;
    phone?: string;
    email?: string;
    monthlyIncome?: number;
    occupation?: string;
    evaluationStatus?: EvaluationStatus;
    notes?: string;
}

/**
 * Client update data
 */
export interface UpdateClientData {
    firstName: string;
    lastName?: string;
    dni?: string;
    phone?: string;
    email?: string;
    monthlyIncome?: number;
    occupation?: string;
    evaluationStatus?: EvaluationStatus;
    notes?: string;
}

/**
 * Paginated clients result
 */
export interface PaginatedClients {
    content: Client[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

/**
 * Business logic helpers
 */
export class ClientHelpers {
    /**
     * Get full name of client
     */
    static getFullName(client: Client): string {
        return client.lastName
            ? `${client.firstName} ${client.lastName}`
            : client.firstName;
    }

    /**
     * Check if client has complete information
     */
    static isComplete(client: Client): boolean {
        return !!(
            client.firstName &&
            client.lastName &&
            client.dni &&
            client.phone &&
            client.email &&
            client.monthlyIncome
        );
    }

    /**
     * Check if client is approved
     */
    static isApproved(client: Client): boolean {
        return client.evaluationStatus === EvaluationStatus.APPROVED;
    }

    /**
     * Format monthly income
     */
    static formatIncome(income: number | null): string {
        if (!income) return 'N/A';
        return `S/ ${income.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
}
