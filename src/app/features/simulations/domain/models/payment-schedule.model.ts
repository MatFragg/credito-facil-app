import { PeriodType } from './period-type.enum';

/**
 * Payment Schedule Domain Model
 */
export interface PaymentSchedule {
    paymentNumber: number;
    paymentDate: Date;
    initialBalance: number;
    payment: number;
    principal: number;
    interest: number;
    finalBalance: number;
    lifeInsurance: number;
    propertyInsurance: number;
    desgravamenInsurance?: number;
    totalPayment: number;
    periodType: PeriodType;
}

/**
 * Payment Schedule Totals
 */
export interface PaymentScheduleTotals {
    totalPayments: number;
    totalPrincipal: number;
    totalInterest: number;
    totalLifeInsurance: number;
    totalPropertyInsurance: number;
    totalDesgravamenInsurance?: number;
    grandTotal: number;
}

/**
 * Helper functions for payment schedule
 */
export class PaymentScheduleHelpers {
    /**
     * Calculate totals from payment schedule array
     */
    static calculateTotals(schedule: PaymentSchedule[]): PaymentScheduleTotals {
        return schedule.reduce((totals, payment) => ({
            totalPayments: totals.totalPayments + payment.payment,
            totalPrincipal: totals.totalPrincipal + payment.principal,
            totalInterest: totals.totalInterest + payment.interest,
            totalLifeInsurance: totals.totalLifeInsurance + payment.lifeInsurance,
            totalPropertyInsurance: totals.totalPropertyInsurance + payment.propertyInsurance,
            totalDesgravamenInsurance: (totals.totalDesgravamenInsurance || 0) + (payment.desgravamenInsurance || 0),
            grandTotal: totals.grandTotal + payment.totalPayment
        }), {
            totalPayments: 0,
            totalPrincipal: 0,
            totalInterest: 0,
            totalLifeInsurance: 0,
            totalPropertyInsurance: 0,
            totalDesgravamenInsurance: 0,
            grandTotal: 0
        });
    }

    /**
     * Format currency for Peru (S/)
     */
    static formatCurrency(amount: number): string {
        return `S/ ${amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
}
