import { BaseModel } from "../../../../shared/models/base.model";

export interface BankEntity extends BaseModel {
    name: string;
    currentRate: number;
    minimunIncome: number;
    maxCoveragePct: number;

    // NCMV Configuration
    desgravamenRate?: number;
    ncmvMinPropertyValue?: number;
    ncmvMaxPropertyValue?: number;
    ncmvMaxPropertyValueCRC?: number;
    pbpThresholdLow?: number;
    pbpAmountStandard?: number;
    pbpAmountPlus?: number;
    supportsNCMV?: boolean;
}


export class BankEntityValidator {

    static isValidUpdate(original: BankEntity, updated: BankEntity): boolean {
        return (
            this.isSameName(original.name, updated.name) &&
            this.isCurrentRateValid(updated.currentRate) &&
            this.isMinimunIncomeValid(updated.minimunIncome) &&
            this.isMaxCoveragePctValid(updated.maxCoveragePct)
        );
    }

    static isSameName(originalName: string, updatedName: string): boolean {
        return originalName.trim().toLowerCase() === updatedName.trim().toLowerCase();
    }

    static isMinimunIncomeValid(minimunIncome: number): boolean {
        return minimunIncome >= 2000;
    }

    static isMaxCoveragePctValid(maxCoveragePct: number): boolean {
        return maxCoveragePct >= 0 && maxCoveragePct <= 100;
    }

    static isCurrentRateValid(currentRate: number): boolean {
        return currentRate >= 7.5 && currentRate <= 9.6;
    }
}