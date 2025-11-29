import { Observable } from 'rxjs';
import { Simulation, CreateSimulationData, UpdateSimulationData, PaginatedSimulations } from '../models/simulation.model';
import { PaymentSchedule } from '../models/payment-schedule.model';

/**
 * Simulation Repository Interface
 * Abstract repository for simulation data access
 */
export abstract class SimulationRepository {
    /**
     * Calculate simulation preview without saving
     */
    abstract calculatePreview(data: CreateSimulationData): Observable<Simulation>;

    /**
     * Save simulation to database
     */
    abstract save(data: CreateSimulationData): Observable<Simulation>;

    /**
     * Get all simulations with pagination
     */
    abstract getAll(page: number, size: number): Observable<PaginatedSimulations>;

    /**
     * Get my simulations (logged in user)
     */
    abstract getMySimulations(page: number, size: number): Observable<PaginatedSimulations>;

    /**
     * Get simulation by ID
     */
    abstract getById(id: number): Observable<Simulation>;

    /**
     * Get payment schedule for a simulation
     */
    abstract getSchedule(id: number): Observable<PaymentSchedule[]>;

    /**
     * Update simulation
     */
    abstract update(id: number, data: UpdateSimulationData): Observable<Simulation>;

    /**
     * Delete simulation
     */
    abstract delete(id: number): Observable<void>;
}
