import { Simulation, PaginatedSimulations } from '../../domain/models/simulation.model';
import { PaymentSchedule } from '../../domain/models/payment-schedule.model';

/**
 * Simulation State Interface
 */
export interface SimulationState {
    // Current simulation being edited/calculated
    currentSimulation: Simulation | null;

    // Payment schedule for current simulation
    paymentSchedule: PaymentSchedule[] | null;

    // Loading states
    calculating: boolean;
    saving: boolean;
    loadingSchedule: boolean;

    // Error state
    error: string | null;

    // History state
    mySimulations: PaginatedSimulations | null;
    loadingHistory: boolean;

    // UI state
    showResults: boolean;
    showSchedule: boolean;
}

/**
 * Initial state
 */
export const initialSimulationState: SimulationState = {
    currentSimulation: null,
    paymentSchedule: null,
    mySimulations: null,
    calculating: false,
    saving: false,
    loadingSchedule: false,
    loadingHistory: false,
    error: null,
    showResults: false,
    showSchedule: false
};
