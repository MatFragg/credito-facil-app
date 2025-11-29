/**
 * Payment Schedule DTO
 * Matches backend PaymentScheduleResponse
 */
export interface PaymentScheduleDto {
    paymentNumber: number;
    paymentDate: string;
    initialBalance: number;
    payment: number;
    principal: number;
    interest: number;
    finalBalance: number;
    lifeInsurance: number;
    propertyInsurance: number;
    desgravamenInsurance?: number;
    totalPayment: number;
    periodType: string;
}
