import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimulationRepository } from '../repositories/simulation.repository';
import { Simulation, CreateSimulationData } from '../models/simulation.model';

/**
 * Use Case: Save Simulation
 * Saves simulation to database
 */
@Injectable()
export class SaveSimulationUseCase {
    constructor(private repository: SimulationRepository) { }

    execute(data: CreateSimulationData): Observable<Simulation> {
        this.validateSimulationData(data);
        return this.repository.save(data);
    }

    private validateSimulationData(data: CreateSimulationData): void {
        if (!data.clientId || data.clientId <= 0) {
            throw new Error('Client ID is required');
        }

        if (!data.propertyId || data.propertyId <= 0) {
            throw new Error('Property ID is required');
        }

        if (!data.bankEntityId || data.bankEntityId <= 0) {
            throw new Error('Bank Entity ID is required');
        }

        if (!data.settingsId || data.settingsId <= 0) {
            throw new Error('Settings ID is required');
        }

        if (!data.propertyPrice || data.propertyPrice <= 0) {
            throw new Error('Property price must be greater than 0');
        }

        if (!data.downPayment || data.downPayment < 0) {
            throw new Error('Down payment cannot be negative');
        }

        if (data.downPayment >= data.propertyPrice) {
            throw new Error('Down payment cannot be greater than or equal to property price');
        }

        if (!data.annualRate || data.annualRate <= 0 || data.annualRate > 100) {
            throw new Error('Annual rate must be between 0 and 100');
        }

        if (!data.termYears || data.termYears < 1 || data.termYears > 30) {
            throw new Error('Term must be between 1 and 30 years');
        }
    }
}
