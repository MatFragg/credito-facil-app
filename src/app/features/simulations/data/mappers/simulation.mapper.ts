import { SimulationDto, PaginatedSimulationsDto } from '../dtos/simulation.dto';
import { PaymentScheduleDto } from '../dtos/payment-schedule.dto';
import { CreateSimulationDto } from '../dtos/create-simulation.dto';
import { UpdateSimulationDto } from '../dtos/update-simulation.dto';
import { Simulation, CreateSimulationData, UpdateSimulationData, PaginatedSimulations } from '../../domain/models/simulation.model';
import { PaymentSchedule } from '../../domain/models/payment-schedule.model';
import { BonusType } from '../../domain/models/bonus-type.enum';
import { SimulationStatus } from '../../domain/models/simulation-status.enum';
import { PeriodType } from '../../domain/models/period-type.enum';

/**
 * Simulation Mapper
 * Converts between DTOs and domain models
 */
export class SimulationMapper {
    /**
     * Convert DTO to domain model
     */
    static toModel(dto: SimulationDto): Simulation {
        return {
            id: dto.id,
            clientId: dto.clientId,
            propertyId: dto.propertyId,
            bankEntityId: dto.bankEntityId,
            settingsId: dto.settingsId,
            simulationName: dto.simulationName,
            simulationCode: dto.simulationCode,
            propertyPrice: dto.propertyPrice,
            downPayment: dto.downPayment,
            applyGovernmentBonus: dto.applyGovernmentBonus,
            governmentBonusAmount: dto.governmentBonusAmount,
            bonusType: dto.bonusType ? dto.bonusType as BonusType : null,
            annualRate: dto.annualRate,
            termYears: dto.termYears,
            lifeInsuranceRate: dto.lifeInsuranceRate,
            propertyInsurance: dto.propertyInsurance,
            propertyInsuranceRate: dto.propertyInsuranceRate,
            openingCommission: dto.openingCommission,
            notaryFees: dto.notaryFees,
            registrationFees: dto.registrationFees,
            amountToFinance: dto.amountToFinance,
            loanAmount: dto.loanAmount,
            monthlyPayment: dto.monthlyPayment,
            totalMonthlyPayment: dto.totalMonthlyPayment,
            totalAmountToPay: dto.totalAmountToPay,
            totalInterest: dto.totalInterest,
            totalAdditionalCosts: dto.totalAdditionalCosts,
            loanTermMonths: dto.loanTermMonths,
            totalLifeInsurance: dto.totalLifeInsurance,
            totalPropertyInsurance: dto.totalPropertyInsurance,
            // Multi-currency
            currency: dto.currency,
            currencySymbol: dto.currencySymbol,
            exchangeRateUsed: dto.exchangeRateUsed,
            propertyPriceAlternate: dto.propertyPriceAlternate,
            monthlyPaymentAlternate: dto.monthlyPaymentAlternate,
            alternateCurrency: dto.alternateCurrency,
            alternateCurrencySymbol: dto.alternateCurrencySymbol,
            // Financial indicators
            discountRate: dto.discountRate,
            npv: dto.npv,
            irr: dto.irr,
            tcea: dto.tcea,
            status: dto.status as SimulationStatus,
            createdAt: new Date(dto.createdAt),
            updatedAt: new Date(dto.updatedAt),
            // PBP and Desgravamen
            applyPBP: dto.applyPBP,
            pbpAmount: dto.pbpAmount,
            desgravamenRate: dto.desgravamenRate,
            totalDesgravamenInsurance: dto.totalDesgravamenInsurance
        };
    }

    /**
     * Convert paginated DTO to paginated model
     */
    static toPaginatedModel(dto: PaginatedSimulationsDto): PaginatedSimulations {
        return {
            content: dto.content.map(item => this.toModel(item)),
            totalElements: dto.totalElements,
            totalPages: dto.totalPages,
            size: dto.size,
            number: dto.number,
            first: dto.first,
            last: dto.last,
            empty: dto.empty
        };
    }

    /**
     * Convert payment schedule DTO to model
     */
    static toPaymentScheduleModel(dto: PaymentScheduleDto): PaymentSchedule {
        return {
            paymentNumber: dto.paymentNumber,
            paymentDate: new Date(dto.paymentDate),
            initialBalance: dto.initialBalance,
            payment: dto.payment,
            principal: dto.principal,
            interest: dto.interest,
            finalBalance: dto.finalBalance,
            lifeInsurance: dto.lifeInsurance,
            propertyInsurance: dto.propertyInsurance,
            desgravamenInsurance: dto.desgravamenInsurance,
            totalPayment: dto.totalPayment,
            periodType: dto.periodType as PeriodType
        };
    }

    /**
     * Convert create data to DTO
     */
    static toCreateDto(data: CreateSimulationData): CreateSimulationDto {
        return {
            clientId: data.clientId,
            propertyId: data.propertyId,
            bankEntityId: data.bankEntityId,
            settingsId: data.settingsId,
            simulationName: data.simulationName,
            propertyPrice: data.propertyPrice,
            downPayment: data.downPayment,
            applyGovernmentBonus: data.applyGovernmentBonus,
            governmentBonusAmount: data.governmentBonusAmount,
            bonusType: data.bonusType,
            annualRate: data.annualRate,
            termYears: data.termYears,
            lifeInsuranceRate: data.lifeInsuranceRate,
            propertyInsurance: data.propertyInsurance,
            propertyInsuranceRate: data.propertyInsuranceRate,
            openingCommission: data.openingCommission,
            notaryFees: data.notaryFees,
            registrationFees: data.registrationFees,
            status: data.status,
            desgravamenRate: data.desgravamenRate,
            applyPBP: data.applyPBP,
            currency: data.currency,
            discountRate: data.discountRate
        };
    }

    /**
     * Convert update data to DTO
     */
    static toUpdateDto(data: UpdateSimulationData): UpdateSimulationDto {
        return {
            clientId: data.clientId,
            propertyId: data.propertyId,
            bankEntityId: data.bankEntityId,
            settingsId: data.settingsId,
            simulationName: data.simulationName,
            propertyPrice: data.propertyPrice,
            downPayment: data.downPayment,
            applyGovernmentBonus: data.applyGovernmentBonus,
            governmentBonusAmount: data.governmentBonusAmount,
            bonusType: data.bonusType,
            annualRate: data.annualRate,
            termYears: data.termYears,
            lifeInsuranceRate: data.lifeInsuranceRate,
            propertyInsurance: data.propertyInsurance,
            propertyInsuranceRate: data.propertyInsuranceRate,
            openingCommission: data.openingCommission,
            notaryFees: data.notaryFees,
            registrationFees: data.registrationFees,
            status: data.status,
            desgravamenRate: data.desgravamenRate,
            applyPBP: data.applyPBP,
            currency: data.currency,
            discountRate: data.discountRate
        };
    }
}
