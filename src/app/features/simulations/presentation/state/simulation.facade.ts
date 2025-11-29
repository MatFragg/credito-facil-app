import { Injectable, signal, computed } from '@angular/core';
import { SimulationState, initialSimulationState } from './simulation.state';
import { CreateSimulationData, UpdateSimulationData } from '../../domain/models/simulation.model';
import { CalculateSimulationUseCase } from '../../domain/usecases/calculate-simulation.usecase';
import { SaveSimulationUseCase } from '../../domain/usecases/save-simulation.usecase';
import { GetPaymentScheduleUseCase } from '../../domain/usecases/get-payment-schedule.usecase';
import { UpdateSimulationUseCase } from '../../domain/usecases/update-simulation.usecase';

import { GetMySimulationsUseCase } from '../../domain/usecases/get-my-simulations.usecase';

/**
 * Simulation Facade
 * Manages simulation state using Angular Signals
 */
@Injectable()
export class SimulationFacade {
    // Private state signal
    private state = signal<SimulationState>(initialSimulationState);

    // Public computed signals
    currentSimulation = computed(() => this.state().currentSimulation);
    paymentSchedule = computed(() => this.state().paymentSchedule);
    mySimulations = computed(() => this.state().mySimulations);
    calculating = computed(() => this.state().calculating);
    saving = computed(() => this.state().saving);
    loadingSchedule = computed(() => this.state().loadingSchedule);
    loadingHistory = computed(() => this.state().loadingHistory);
    error = computed(() => this.state().error);
    showResults = computed(() => this.state().showResults);
    showSchedule = computed(() => this.state().showSchedule);

    constructor(
        private calculateSimulationUseCase: CalculateSimulationUseCase,
        private saveSimulationUseCase: SaveSimulationUseCase,
        private getPaymentScheduleUseCase: GetPaymentScheduleUseCase,
        private updateSimulationUseCase: UpdateSimulationUseCase,
        private getMySimulationsUseCase: GetMySimulationsUseCase
    ) { }

    /**
     * Calculate simulation preview (preserves ID if recalculating existing simulation)
     */
    calculatePreview(data: CreateSimulationData): void {
        this.state.update(s => ({ ...s, calculating: true, error: null }));

        // Preserve existing simulation ID if we're recalculating
        const existingId = this.state().currentSimulation?.id;

        this.calculateSimulationUseCase.execute(data).subscribe({
            next: (simulation) => {
                this.state.update(s => ({
                    ...s,
                    currentSimulation: {
                        ...simulation,
                        // Preserve the original ID so we can update instead of create
                        id: existingId || simulation.id
                    },
                    calculating: false,
                    showResults: true,
                    // Clear payment schedule for previews (will reload after save)
                    paymentSchedule: null,
                    showSchedule: false
                }));
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    calculating: false,
                    error: error.message || 'Error al calcular simulación'
                }));
            }
        });
    }

    /**
     * Save simulation to database
     */
    saveSimulation(data: CreateSimulationData): void {
        this.state.update(s => ({ ...s, saving: true, error: null }));

        this.saveSimulationUseCase.execute(data).subscribe({
            next: (simulation) => {
                this.state.update(s => ({
                    ...s,
                    currentSimulation: simulation,
                    saving: false
                }));
                // Auto-load payment schedule now that we have an ID
                if (simulation.id) {
                    this.loadPaymentSchedule(simulation.id);
                }
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    saving: false,
                    error: error.message || 'Error al guardar simulación'
                }));
            }
        });
    }

    /**
     * Update existing simulation
     */
    updateSimulation(id: number, data: UpdateSimulationData): void {
        this.state.update(s => ({ ...s, saving: true, error: null }));

        this.updateSimulationUseCase.execute(id, data).subscribe({
            next: (simulation) => {
                this.state.update(s => ({
                    ...s,
                    currentSimulation: simulation,
                    saving: false
                }));
                // Reload payment schedule
                this.loadPaymentSchedule(simulation.id);
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    saving: false,
                    error: error.message || 'Error al actualizar simulación'
                }));
            }
        });
    }

    /**
     * Load payment schedule (only works for saved simulations with ID)
     */
    loadPaymentSchedule(simulationId: number): void {
        this.state.update(s => ({ ...s, loadingSchedule: true, error: null, showSchedule: true }));

        this.getPaymentScheduleUseCase.execute(simulationId).subscribe({
            next: (schedule) => {
                this.state.update(s => ({
                    ...s,
                    paymentSchedule: schedule,
                    loadingSchedule: false
                }));
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    loadingSchedule: false,
                    error: error.message || 'Error al cargar cronograma'
                }));
            }
        });
    }

    /**
     * Load user's simulations history
     */
    loadMySimulations(page: number = 0, size: number = 10): void {
        this.state.update(s => ({ ...s, loadingHistory: true, error: null }));

        this.getMySimulationsUseCase.execute({ page, size }).subscribe({
            next: (paginated) => {
                this.state.update(s => ({
                    ...s,
                    mySimulations: paginated,
                    loadingHistory: false
                }));
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    loadingHistory: false,
                    error: error.message || 'Error al cargar historial de simulaciones'
                }));
            }
        });
    }

    /**
     * Toggle schedule visibility
     */
    toggleSchedule(): void {
        const currentSim = this.state().currentSimulation;

        // Only load schedule if simulation has an ID and schedule not loaded yet
        if (currentSim?.id && !this.state().paymentSchedule && !this.state().showSchedule) {
            this.loadPaymentSchedule(currentSim.id);
        } else {
            this.state.update(s => ({ ...s, showSchedule: !s.showSchedule }));
        }
    }

    /**
     * Reset calculator
     */
    reset(): void {
        this.state.set(initialSimulationState);
    }

    /**
     * Clear error
     */
    clearError(): void {
        this.state.update(s => ({ ...s, error: null }));
    }
}
