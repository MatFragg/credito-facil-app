import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FilterBarConfig, FilterValues, AnyFilterField, NumberRangeField } from '../../models/filter-field.model';

@Component({
    selector: 'app-filter-bar',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './filter-bar.component.html',
    styleUrl: './filter-bar.component.css'
})
export class FilterBarComponent implements OnInit {
    @Input() config!: FilterBarConfig;
    @Output() filterChange = new EventEmitter<FilterValues>();
    @Output() clearFilters = new EventEmitter<void>();

    // Signal to track current filter values
    filterValues = signal<FilterValues>({});

    ngOnInit(): void {
        // Initialize filter values
        const initialValues: FilterValues = {};
        this.config.fields.forEach(field => {
            if (field.type === 'number-range') {
                initialValues[`${field.id}_min`] = null;
                initialValues[`${field.id}_max`] = null;
            } else {
                initialValues[field.id] = '';
            }
        });
        this.filterValues.set(initialValues);
    }

    onFieldChange(fieldId: string, value: any): void {
        const currentValues = this.filterValues();
        const updatedValues = { ...currentValues, [fieldId]: value };
        this.filterValues.set(updatedValues);

        // Auto-emit if in auto mode
        if (this.config.applyMode !== 'manual') {
            this.emitFilterChange();
        }
    }

    onApply(): void {
        this.emitFilterChange();
    }

    onClear(): void {
        // Reset all values
        const clearedValues: FilterValues = {};
        this.config.fields.forEach(field => {
            if (field.type === 'number-range') {
                clearedValues[`${field.id}_min`] = null;
                clearedValues[`${field.id}_max`] = null;
            } else {
                clearedValues[field.id] = '';
            }
        });
        this.filterValues.set(clearedValues);

        // Emit clear event
        this.clearFilters.emit();

        // Also emit filter change with cleared values
        this.emitFilterChange();
    }

    private emitFilterChange(): void {
        // Filter out empty values before emitting
        const values = this.filterValues();
        const nonEmptyValues: FilterValues = {};

        Object.keys(values).forEach(key => {
            const value = values[key];
            if (value !== null && value !== undefined && value !== '') {
                nonEmptyValues[key] = value;
            }
        });

        this.filterChange.emit(nonEmptyValues);
    }

    isNumberRangeField(field: AnyFilterField): field is NumberRangeField {
        return field.type === 'number-range';
    }

    getFieldValue(fieldId: string): any {
        return this.filterValues()[fieldId] || '';
    }

    getClearButtonText(): string {
        return this.config.clearButtonText || 'Limpiar filtros';
    }

    getApplyButtonText(): string {
        return this.config.applyButtonText || 'Aplicar';
    }

    trackByFieldId(index: number, field: AnyFilterField): string {
        return field.id;
    }

    trackByOptionValue(index: number, option: { value: string; label: string }): string {
        return option.value;
    }

    hasNumberRangeField(): boolean {
        return this.config.fields.some(f => f.type === 'number-range');
    }
}
