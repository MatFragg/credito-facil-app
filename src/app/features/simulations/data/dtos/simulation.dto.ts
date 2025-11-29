/**
 * Simulation Response DTO
 * Matches backend SimulationResponse
 */
export interface SimulationDto {
    id: number;
    clientId: number;
    propertyId: number;
    bankEntityId: number;
    settingsId: number;
    simulationName: string | null;
    simulationCode: string;
    propertyPrice: number;
    downPayment: number;
    amountToFinance: number;
    applyGovernmentBonus: boolean;
    governmentBonusAmount: number;
    bonusType: string | null;
    annualRate: number;
    termYears: number;
    lifeInsuranceRate: number;
    propertyInsurance: number;
    openingCommission: number;
    notaryFees: number;
    registrationFees: number;
    monthlyPayment: number;
    totalMonthlyPayment: number;
    totalAmountToPay: number;
    totalInterest: number;
    totalAdditionalCosts: number;
    loanTermMonths: number;
    totalLifeInsurance: number;
    totalPropertyInsurance: number;
    npv: number;
    irr: number;
    tcea: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    // PBP and Desgravamen
    desgravamenRate?: number;
    totalDesgravamenInsurance?: number;
    applyPBP?: boolean;
    pbpAmount?: number;
}

/**
 * Paginated Simulations Response
 */
export interface PaginatedSimulationsDto {
    content: SimulationDto[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}
