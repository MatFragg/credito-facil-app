/**
 * Data Transfer Object for creating a new client
 * Maps to: com.matfragg.creditofacil.api.dto.request.ClientRequest
 */
export interface CreateClientDto {
    firstName: string;
    lastName?: string;
    dni?: string;
    phone?: string;
    email?: string;
    monthlyIncome?: number;
    occupation?: string;
    evaluationStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
    notes?: string;
}
