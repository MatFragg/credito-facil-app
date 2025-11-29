import { BonusType } from './bonus-type.enum';
import { SimulationStatus } from './simulation-status.enum';

/**
 * Simulation Domain Model
 */
export interface Simulation {
    id: number;
    clientId: number;
    propertyId: number;
    bankEntityId: number;
    settingsId: number;
    simulationName: string | null;
    simulationCode: string;

    // Input parameters
    propertyPrice: number;
    downPayment: number;
    applyGovernmentBonus: boolean;
    governmentBonusAmount: number;
    bonusType: BonusType | null;
    annualRate: number;
    termYears: number;

    // Additional costs
    lifeInsuranceRate: number;
    propertyInsurance: number;
    openingCommission: number;
    notaryFees: number;
    registrationFees: number;

    // Calculated results
    amountToFinance: number;
    monthlyPayment: number;
    totalMonthlyPayment: number;
    totalAmountToPay: number;
    totalInterest: number;
    totalAdditionalCosts: number;
    loanTermMonths: number;
    totalLifeInsurance: number;
    totalPropertyInsurance: number;

    // PBP and Desgravamen
    applyPBP?: boolean;
    pbpAmount?: number;
    desgravamenRate?: number;
    totalDesgravamenInsurance?: number;

    // Financial indicators
    npv: number;
    irr: number;
    tcea: number;

    status: SimulationStatus;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * Data for creating new simulation
 */
export interface CreateSimulationData {
    clientId: number;
    propertyId: number;
    bankEntityId: number;
    settingsId: number;
    simulationName?: string;
    propertyPrice: number;
    downPayment: number;
    applyGovernmentBonus?: boolean;
    governmentBonusAmount?: number;
    bonusType?: BonusType;
    annualRate: number;
    termYears: number;
    lifeInsuranceRate?: number;
    propertyInsurance?: number;
    openingCommission?: number;
    notaryFees?: number;
    registrationFees?: number;
    status?: SimulationStatus;
    desgravamenRate?: number;
    applyPBP?: boolean;
}

/**
 * Data for updating simulation
 */
export interface UpdateSimulationData {
    clientId: number;
    propertyId: number;
    bankEntityId: number;
    settingsId: number;
    simulationName?: string;
    propertyPrice: number;
    downPayment: number;
    applyGovernmentBonus?: boolean;
    governmentBonusAmount?: number;
    bonusType?: BonusType;
    annualRate: number;
    termYears: number;
    lifeInsuranceRate?: number;
    propertyInsurance?: number;
    openingCommission?: number;
    notaryFees?: number;
    registrationFees?: number;
    status?: SimulationStatus;
    desgravamenRate?: number;
    applyPBP?: boolean;
}

/**
 * Paginated Simulations
 */
export interface PaginatedSimulations {
    content: Simulation[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    last: boolean;
    empty: boolean;
}

/**
 * Simulation Helper Functions
 */
export class SimulationHelpers {
    /**
     * Calculate amount to finance
     */
    static calculateAmountToFinance(propertyPrice: number, downPayment: number, governmentBonus: number = 0): number {
        return propertyPrice - downPayment - governmentBonus;
    }

    /**
     * Format currency for Peru (S/)
     */
    static formatCurrency(amount: number): string {
        return `S/ ${amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    /**
     * Format percentage
     */
    static formatPercentage(value: number, decimals: number = 2): string {
        return `${value.toFixed(decimals)}%`;
    }

    /**
     * Get simulation summary
     */
    static getSummary(simulation: Simulation): string {
        return `${simulation.simulationCode} - ${SimulationHelpers.formatCurrency(simulation.propertyPrice)} - ${simulation.termYears} años`;
    }
}
