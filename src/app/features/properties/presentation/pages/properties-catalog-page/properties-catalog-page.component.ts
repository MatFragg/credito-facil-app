import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { PropertiesFacade } from '../../state/properties.facade';
import { FilterBarComponent } from '../../../../../shared/components/filter-bar/filter-bar.component';
import { FilterBarConfig, FilterValues, NumberRangeField } from '../../../../../shared/models/filter-field.model';
import { Property, PropertyHelpers } from '../../../domain/models/property.model';
import { PropertyType, getPropertyTypeOptions, PropertyTypeLabels } from '../../../domain/models/property-type.enum';
import { PropertyStatus, getPropertyStatusOptions, PropertyStatusLabels } from '../../../domain/models/property-status.enum';
import { PropertyFilters } from '../../state/properties.state';

@Component({
    selector: 'app-properties-catalog-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        FilterBarComponent
    ],
    templateUrl: './properties-catalog-page.component.html',
    styleUrls: ['./properties-catalog-page.component.css']
})
export class PropertiesCatalogPageComponent implements OnInit {
    // Filter values (keeping for backward compatibility)
    searchQuery: string = '';
    selectedType: PropertyType | 'ALL' = 'ALL';
    selectedStatus: PropertyStatus | 'ALL' = 'ALL';
    minPrice: number | null = null;
    maxPrice: number | null = null;

    // Dropdown options
    propertyTypes = getPropertyTypeOptions();
    propertyStatuses = getPropertyStatusOptions();

    // Math object for pagination
    Math = Math;

    // Filter Bar Configuration
    filterConfig: FilterBarConfig = {
        layoutMode: 'multi-row',
        containerStyle: 'card',
        applyMode: 'manual',
        fields: [
            {
                id: 'search',
                type: 'text',
                label: '',
                icon: 'search',
                placeholder: 'Buscar por código o proyecto...',
                width: 'flex-1'
            },
            {
                id: 'type',
                type: 'select',
                label: '',
                placeholder: 'Todos los tipos',
                options: [
                    { value: 'ALL', label: 'Todos los tipos' },
                    { value: 'HOUSE', label: 'Casa' },
                    { value: 'APARTMENT', label: 'Departamento' },
                    { value: 'DUPLEX', label: 'Duplex' },
                    { value: 'PENTHOUSE', label: 'Penthouse' },
                    { value: 'VILLA', label: 'Villa' }
                ],
                width: '200px'
            },
            {
                id: 'status',
                type: 'select',
                label: '',
                placeholder: 'Todos los estados',
                options: [
                    { value: 'ALL', label: 'Todos los estados' },
                    ...this.propertyStatuses
                ],
                width: '200px'
            },
            {
                id: 'price',
                type: 'number-range',
                label: '',
                rangeLabel: 'Rango de precio:',
                minLabel: 'Min S/',
                maxLabel: 'Max S/',
                placeholder: '0',
                applyButtonText: 'Aplicar',
                width: '100%'
            } as NumberRangeField
        ]
    };

    constructor(
        public facade: PropertiesFacade,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.facade.loadProperties();
    }

    onFilterChange(filters: FilterValues): void {
        // Update filter values
        this.searchQuery = filters['search'] || '';
        this.selectedType = (filters['type'] as PropertyType | 'ALL') || 'ALL';
        this.selectedStatus = (filters['status'] as PropertyStatus | 'ALL') || 'ALL';
        this.minPrice = filters['price_min'] || null;
        this.maxPrice = filters['price_max'] || null;

        // Apply filters
        this.applyFilters();
    }

    onSearch(): void {
        this.applyFilters();
    }

    onApplyPriceFilter(): void {
        this.applyFilters();
    }

    onClearFilters(): void {
        this.searchQuery = '';
        this.selectedType = 'ALL';
        this.selectedStatus = 'ALL';
        this.minPrice = null;
        this.maxPrice = null;
        this.facade.clearFilters();
    }

    applyFilters(): void {
        const filters: PropertyFilters = {};

        if (this.searchQuery.trim()) {
            filters.search = this.searchQuery.trim();
        }

        if (this.selectedType !== 'ALL') {
            filters.type = this.selectedType as PropertyType;
        }

        if (this.selectedStatus !== 'ALL') {
            filters.status = this.selectedStatus as PropertyStatus;
        }

        if (this.minPrice !== null && this.minPrice > 0) {
            filters.minPrice = this.minPrice;
        }

        if (this.maxPrice !== null && this.maxPrice > 0) {
            filters.maxPrice = this.maxPrice;
        }

        this.facade.updateFilters(filters);
    }

    onViewDetails(property: Property): void {
        this.router.navigate(['/properties', property.id]);
    }

    onEdit(property: Property): void {
        this.router.navigate(['/properties/edit', property.id]);
    }

    onDelete(propertyId: number): void {
        if (confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
            this.facade.deleteProperty(propertyId);
        }
    }

    onPageChange(page: number): void {
        this.facade.loadProperties(page);
    }

    // Helper methods for template
    formatPrice(price: number): string {
        return PropertyHelpers.formatPrice(price);
    }

    getPropertyTypeLabel(type: PropertyType): string {
        return PropertyTypeLabels[type] || type;
    }
}
