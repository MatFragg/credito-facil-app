/**
 * Data Transfer Object matching backend ClientResponse
 * Maps to: com.matfragg.creditofacil.api.dto.response.ClientResponse
 */
export interface ClientDto {
    id: number;
    userId: number;
    firstName: string;
    lastName: string | null;
    dni: string | null;
    phone: string | null;
    email: string | null;
    monthlyIncome: number | null;
    occupation: string | null;
    evaluationStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
    notes: string | null;
    createdAt: string;
    updatedAt: string | null;
}

/**
 * Paginated response from backend
 */
export interface PaginatedClientDto {
    content: ClientDto[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}
