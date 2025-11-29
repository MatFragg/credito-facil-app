/**
 * Data Transfer Object for updating an existing client
 * Maps to: com.matfragg.creditofacil.api.dto.request.ClientRequest
 */
export interface UpdateClientDto {
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
