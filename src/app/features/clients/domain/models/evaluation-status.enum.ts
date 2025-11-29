/**
 * Client evaluation status enum
 * Matches backend: com.matfragg.creditofacil.api.model.enums.EvaluationStatus
 */
export enum EvaluationStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

/**
 * Helper function to get display label for evaluation status
 */
export function getEvaluationStatusLabel(status: EvaluationStatus): string {
    switch (status) {
        case EvaluationStatus.PENDING:
            return 'Pendiente';
        case EvaluationStatus.APPROVED:
            return 'Aprobado';
        case EvaluationStatus.REJECTED:
            return 'Rechazado';
        default:
            return status;
    }
}

/**
 * Helper function to get badge class for evaluation status
 */
export function getEvaluationStatusClass(status: EvaluationStatus): string {
    switch (status) {
        case EvaluationStatus.PENDING:
            return 'status-pending';
        case EvaluationStatus.APPROVED:
            return 'status-approved';
        case EvaluationStatus.REJECTED:
            return 'status-rejected';
        default:
            return '';
    }
}
