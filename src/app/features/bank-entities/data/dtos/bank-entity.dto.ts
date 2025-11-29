/**
 * DTOs matching backend API contracts for Bank Entities
 * These mirror the Spring Boot BankEntityResponse and BankEntityRequest
 */
/**
 * DTOs matching backend API contracts for Bank Entities
 * These mirror the Spring Boot BankEntityResponse and BankEntityRequest
 */

/**
 * Bank Entity Response DTO
 * Matches the backend BankEntityResponse structure
 */
export interface BankEntityDto {
    id: number;
    name: string;
    currentRate: number; // Tasa actual (e.g., 7.25 means 7.25%)
    minimunIncome: number; // Ingreso mínimo requerido (e.g., 3500)
    maxCoveragePct: number; // Porcentaje máximo de cobertura (e.g., 80 means 80%)

    // NCMV Configuration
    desgravamenRate?: number; // Tasa mensual de seguro desgravamen (e.g., 0.00049)
    ncmvMinPropertyValue?: number; // Valor mínimo vivienda NCMV (e.g., 68800.00)
    ncmvMaxPropertyValue?: number; // Valor máximo vivienda NCMV (e.g., 362100.00)
    ncmvMaxPropertyValueCRC?: number; // Valor máximo con CRC (e.g., 488800.00)
    pbpThresholdLow?: number; // Límite inferior para PBP Plus (e.g., 102900.00)
    pbpAmountStandard?: number; // Monto PBP Standard (e.g., 6400.00)
    pbpAmountPlus?: number; // Monto PBP Plus (e.g., 17700.00)
    supportsNCMV?: boolean; // Indica si participa en NCMV
}

/**
 * Bank Entity Request DTO
 * Used for creating/updating bank entities
 */
export interface BankEntityRequestDto {
    currentRate: number;
    minimunIncome: number;
    maxCoveragePct: number;

    // NCMV Configuration (optional)
    desgravamenRate?: number;
    ncmvMinPropertyValue?: number;
    ncmvMaxPropertyValue?: number;
    ncmvMaxPropertyValueCRC?: number;
    pbpThresholdLow?: number;
    pbpAmountStandard?: number;
    pbpAmountPlus?: number;
    supportsNCMV?: boolean;
}
