import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimulationRepository } from '../repositories/simulation.repository';
import { PaymentSchedule } from '../models/payment-schedule.model';

/**
 * Use Case: Get Payment Schedule
 * Retrieves payment schedule for a simulation
 */
@Injectable()
export class GetPaymentScheduleUseCase {
    constructor(private repository: SimulationRepository) { }

    execute(simulationId: number): Observable<PaymentSchedule[]> {
        if (!simulationId || simulationId <= 0) {
            throw new Error('Invalid simulation ID');
        }

        return this.repository.getSchedule(simulationId);
    }
}
