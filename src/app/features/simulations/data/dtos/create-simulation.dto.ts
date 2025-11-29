/**
 * Create Simulation Request DTO
 * Matches backend SimulationRequest
 */
export interface CreateSimulationDto {
    clientId: number;
    propertyId: number;
    bankEntityId: number;
    settingsId: number;
    simulationName?: string;
    propertyPrice: number;
    downPayment: number;
    applyGovernmentBonus?: boolean;
    governmentBonusAmount?: number;
    bonusType?: string;
    annualRate: number;
    termYears: number;
    lifeInsuranceRate?: number;
    propertyInsurance?: number;
    openingCommission?: number;
    notaryFees?: number;
    registrationFees?: number;
    status?: string;
    desgravamenRate?: number;
    applyPBP?: boolean;
}
