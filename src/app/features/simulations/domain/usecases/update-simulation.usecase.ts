import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimulationRepository } from '../repositories/simulation.repository';
import { Simulation, UpdateSimulationData } from '../models/simulation.model';

/**
 * Use Case: Update Simulation
 * Updates existing simulation
 */
@Injectable()
export class UpdateSimulationUseCase {
    constructor(private repository: SimulationRepository) { }

    execute(id: number, data: UpdateSimulationData): Observable<Simulation> {
        if (!id || id <= 0) {
            throw new Error('Invalid simulation ID');
        }

        this.validateSimulationData(data);
        return this.repository.update(id, data);
    }

    private validateSimulationData(data: UpdateSimulationData): void {
        if (!data.clientId || data.clientId <= 0) {
            throw new Error('Client ID is required');
        }

        if (!data.propertyId || data.propertyId <= 0) {
            throw new Error('Property ID is required');
        }

        if (!data.propertyPrice || data.propertyPrice <= 0) {
            throw new Error('Property price must be greater than 0');
        }

        if (!data.downPayment || data.downPayment < 0) {
            throw new Error('Down payment cannot be negative');
        }

        if (!data.annualRate || data.annualRate <= 0 || data.annualRate > 100) {
            throw new Error('Annual rate must be between 0 and 100');
        }

        if (!data.termYears || data.termYears < 1 || data.termYears > 30) {
            throw new Error('Term must be between 1 and 30 years');
        }
    }
}
