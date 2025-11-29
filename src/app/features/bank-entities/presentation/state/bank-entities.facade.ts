import { Injectable, signal, computed } from '@angular/core';
import { take } from 'rxjs';
import { BankEntitiesState, initialBankEntitiesState } from './bank-entities.state';
import { BankEntity } from '../../domain/models/bank-entity.model';
import { GetAllBankEntitiesUseCase } from '../../domain/usecases/get-all-bank-entities.usecase';
import { GetBankEntityByIdUseCase } from '../../domain/usecases/get-bank-entity-by-id.usecase';
import { UpdateBankEntityUseCase } from '../../domain/usecases/update-bank-entity.usecase';
import { CompareBankEntitiesUseCase } from '../../domain/usecases/compare-bank-entities.usecase';
import { SearchBankEntitiesUseCase } from '../../domain/usecases/search-bank-entities.usecase';

/**
 * Facade for Bank Entities feature
 * Manages state using Angular Signals and orchestrates use cases
 */
@Injectable({
    providedIn: 'root'
})
export class BankEntitiesFacade {
    // Private state signal
    private state = signal<BankEntitiesState>(initialBankEntitiesState);

    // Public computed signals for component consumption
    entities = computed(() => this.state().entities);
    selectedEntity = computed(() => this.state().selectedEntity);
    comparisonEntities = computed(() => this.state().comparisonEntities);
    loading = computed(() => this.state().loading);
    error = computed(() => this.state().error);
    searchQuery = computed(() => this.state().searchQuery);

    // Computed statistics
    stats = computed(() => {
        const entities = this.entities();
        if (entities.length === 0) {
            return {
                total: 0,
                averageRate: 0,
                lowestMinIncome: 0,
            };
        }

        const totalRate = entities.reduce((sum, e) => sum + e.currentRate, 0);
        const minIncomes = entities.map(e => e.minimunIncome);

        return {
            total: entities.length,
            averageRate: totalRate / entities.length,
            lowestMinIncome: Math.min(...minIncomes),
        };
    });

    constructor(
        private getAllBankEntitiesUseCase: GetAllBankEntitiesUseCase,
        private getBankEntityByIdUseCase: GetBankEntityByIdUseCase,
        private updateBankEntityUseCase: UpdateBankEntityUseCase,
        private compareBankEntitiesUseCase: CompareBankEntitiesUseCase,
        private searchBankEntitiesUseCase: SearchBankEntitiesUseCase
    ) { }

    /**
     * Load all bank entities
     */
    loadAll(): void {
        this.updateState({ loading: true, error: null });

        this.getAllBankEntitiesUseCase.execute()
            .pipe(take(1))
            .subscribe({
                next: (entities) => {
                    this.updateState({ entities, loading: false });
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Error loading bank entities',
                        loading: false
                    });
                }
            });
    }

    /**
     * Search bank entities by query
     * @param query Search query (name)
     */
    search(query: string): void {
        this.updateState({ loading: true, error: null, searchQuery: query });

        this.searchBankEntitiesUseCase.execute(query)
            .pipe(take(1))
            .subscribe({
                next: (entities) => {
                    this.updateState({ entities, loading: false });
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Error searching bank entities',
                        loading: false
                    });
                }
            });
    }

    /**
     * Get bank entity by ID
     */
    loadById(id: number): void {
        this.updateState({ loading: true, error: null });

        this.getBankEntityByIdUseCase.execute(id)
            .pipe(take(1))
            .subscribe({
                next: (entity) => {
                    this.updateState({ selectedEntity: entity, loading: false });
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Error loading bank entity',
                        loading: false
                    });
                }
            });
    }

    /**
     * Update bank entity (ADMIN only)
     */
    update(id: number, entity: BankEntity): void {
        this.updateState({ loading: true, error: null });

        this.updateBankEntityUseCase.execute(id, entity)
            .pipe(take(1))
            .subscribe({
                next: (updatedEntity) => {
                    // Update the entity in the list
                    const entities = this.entities().map(e =>
                        e.id === updatedEntity.id ? updatedEntity : e
                    );
                    this.updateState({ entities, selectedEntity: null, loading: false });
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Error updating bank entity',
                        loading: false
                    });
                }
            });
    }

    /**
     * Compare multiple bank entities
     * @param ids Array of bank entity IDs to compare
     */
    compareEntities(ids: number[]): void {
        if (ids.length === 0) {
            this.updateState({ comparisonEntities: [] });
            return;
        }

        this.updateState({ loading: true, error: null });

        this.compareBankEntitiesUseCase.execute(ids)
            .pipe(take(1))
            .subscribe({
                next: (entities) => {
                    this.updateState({ comparisonEntities: entities, loading: false });
                },
                error: (error) => {
                    this.updateState({
                        error: error.message || 'Error comparing bank entities',
                        loading: false
                    });
                }
            });
    }

    /**
     * Clear selected entity
     */
    clearSelection(): void {
        this.updateState({ selectedEntity: null });
    }

    /**
     * Clear comparison
     */
    clearComparison(): void {
        this.updateState({ comparisonEntities: [] });
    }

    /**
     * Update state helper
     */
    private updateState(partial: Partial<BankEntitiesState>): void {
        this.state.update(current => ({ ...current, ...partial }));
    }
}
