import { Injectable, signal, computed } from '@angular/core';
import { PropertiesState, initialPropertiesState, PropertyFilters } from './properties.state';
import { Property, CreatePropertyData, UpdatePropertyData } from '../../domain/models/property.model';
import { GetPropertiesUseCase } from '../../domain/usecases/get-properties.usecase';
import { CreatePropertyUseCase } from '../../domain/usecases/create-property.usecase';
import { UpdatePropertyUseCase } from '../../domain/usecases/update-property.usecase';
import { DeletePropertyUseCase } from '../../domain/usecases/delete-property.usecase';

/**
 * Properties Facade
 * Manages properties state using Angular Signals
 */
@Injectable()
export class PropertiesFacade {
    // Private state signal
    private state = signal<PropertiesState>(initialPropertiesState);

    // Public computed signals
    properties = computed(() => this.state().properties);
    currentProperty = computed(() => this.state().currentProperty);
    filters = computed(() => this.state().filters);
    loading = computed(() => this.state().loading);
    saving = computed(() => this.state().saving);
    deleting = computed(() => this.state().deleting);
    error = computed(() => this.state().error);

    constructor(
        private getPropertiesUseCase: GetPropertiesUseCase,
        private createPropertyUseCase: CreatePropertyUseCase,
        private updatePropertyUseCase: UpdatePropertyUseCase,
        private deletePropertyUseCase: DeletePropertyUseCase
    ) { }

    /**
     * Load properties with current filters
     */
    loadProperties(page: number = 0, size: number = 20): void {
        this.state.update(s => ({ ...s, loading: true, error: null }));

        this.getPropertiesUseCase.execute(page, size).subscribe({
            next: (properties) => {
                this.state.update(s => ({
                    ...s,
                    properties,
                    loading: false
                }));
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    loading: false,
                    error: error.message || 'Error loading properties'
                }));
            }
        });
    }

    /**
     * Create new property
     */
    createProperty(data: CreatePropertyData): void {
        this.state.update(s => ({ ...s, saving: true, error: null }));

        this.createPropertyUseCase.execute(data).subscribe({
            next: (property) => {
                this.state.update(s => ({
                    ...s,
                    currentProperty: property,
                    saving: false
                }));
                // Refresh list
                this.loadProperties();
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    saving: false,
                    error: error.message || 'Error creating property'
                }));
            }
        });
    }

    /**
     * Update existing property
     */
    updateProperty(id: number, data: UpdatePropertyData): void {
        this.state.update(s => ({ ...s, saving: true, error: null }));

        this.updatePropertyUseCase.execute(id, data).subscribe({
            next: (property) => {
                this.state.update(s => ({
                    ...s,
                    currentProperty: property,
                    saving: false
                }));
                // Refresh list
                this.loadProperties();
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    saving: false,
                    error: error.message || 'Error updating property'
                }));
            }
        });
    }

    /**
     * Delete property
     */
    deleteProperty(id: number): void {
        this.state.update(s => ({ ...s, deleting: true, error: null }));

        this.deletePropertyUseCase.execute(id).subscribe({
            next: () => {
                this.state.update(s => ({
                    ...s,
                    deleting: false
                }));
                // Refresh list
                this.loadProperties();
            },
            error: (error) => {
                this.state.update(s => ({
                    ...s,
                    deleting: false,
                    error: error.message || 'Error deleting property'
                }));
            }
        });
    }

    /**
     * Update filters
     */
    updateFilters(filters: PropertyFilters): void {
        this.state.update(s => ({ ...s, filters }));
        // Reload with new filters
        this.loadProperties();
    }

    /**
     * Clear filters
     */
    clearFilters(): void {
        this.state.update(s => ({ ...s, filters: {} }));
        this.loadProperties();
    }

    /**
     * Clear error
     */
    clearError(): void {
        this.state.update(s => ({ ...s, error: null }));
    }
}
