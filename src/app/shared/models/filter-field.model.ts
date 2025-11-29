/**
 * Filter Field Models
 * Defines the structure and types for configurable filter fields
 */

export type FilterFieldType = 'text' | 'date' | 'select' | 'number' | 'number-range';

export interface SelectOption {
    value: string;
    label: string;
}

export interface FilterField {
    id: string;
    type: FilterFieldType;
    label: string;
    placeholder?: string;
    options?: SelectOption[];
    icon?: string;
    width?: string; // CSS width value, e.g., '200px', 'flex-1', '100%'
    min?: number; // For number type
    max?: number; // For number type
    step?: number; // For number type
}

export interface NumberRangeField extends FilterField {
    type: 'number-range';
    rangeLabel?: string; // Label for the range section
    minLabel?: string; // Label for min input
    maxLabel?: string; // Label for max input
    applyButtonText?: string; // Text for apply button
}

export type AnyFilterField = FilterField | NumberRangeField;

export interface FilterBarConfig {
    title?: string; // Optional section title (e.g., "Filtros", "Filtros y Búsqueda")
    showClearButton?: boolean; // Show "Limpiar filtros" button
    clearButtonText?: string; // Text for clear button (default: "Limpiar filtros")
    layoutMode?: 'horizontal' | 'multi-row'; // Layout style
    containerStyle?: 'card' | 'inline'; // Container style
    applyMode?: 'auto' | 'manual'; // Auto-emit changes or manual with "Aplicar" button
    applyButtonText?: string; // Text for apply button (default: "Aplicar")
    fields: AnyFilterField[];
}

export interface FilterValues {
    [key: string]: any;
}

export interface FilterChangeEvent {
    filters: FilterValues;
    changedFieldId?: string;
}
