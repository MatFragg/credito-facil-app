/**
 * Simulation Status Enum
 * Matches backend SimulationStatus enum
 */
export enum SimulationStatus {
    DRAFT = 'DRAFT',
    SAVED = 'SAVED',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

/**
 * Simulation Status Display Labels (Spanish)
 */
export const SimulationStatusLabels: Record<SimulationStatus, string> = {
    [SimulationStatus.DRAFT]: 'Borrador',
    [SimulationStatus.SAVED]: 'Guardada',
    [SimulationStatus.APPROVED]: 'Aprobada',
    [SimulationStatus.REJECTED]: 'Rechazada'
};

/**
 * Simulation Status Colors
 */
export const SimulationStatusColors: Record<SimulationStatus, string> = {
    [SimulationStatus.DRAFT]: '#9ca3af',
    [SimulationStatus.SAVED]: '#3b82f6',
    [SimulationStatus.APPROVED]: '#10b981',
    [SimulationStatus.REJECTED]: '#ef4444'
};

/**
 * Get all simulation status options for dropdown
 */
export function getSimulationStatusOptions(): { value: SimulationStatus; label: string }[] {
    return Object.values(SimulationStatus).map(value => ({
        value,
        label: SimulationStatusLabels[value]
    }));
}
