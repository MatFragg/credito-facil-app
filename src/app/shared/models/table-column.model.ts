/**
 * Generic table column configuration interface
 * Defines how each column should be rendered and behave in a data table
 */
export interface TableColumn<T = any> {
    /** Unique key for the column (matches property name in data) */
    key: string;

    /** Display label for column header */
    label: string;

    /** Type of data/rendering for this column */
    type?: 'text' | 'number' | 'currency' | 'percentage' | 'date' | 'badge' | 'boolean' | 'icon' | 'image' | 'link' | 'actions' | 'custom';

    /** Optional width (CSS value like '100px' or '20%') */
    width?: string;

    /** Whether this column is sortable */
    sortable?: boolean;

    /** Custom template function for rendering cell content */
    cellTemplate?: (row: T) => string;

    /** CSS class(es) for the cell - can be static or dynamic based on row data */
    cssClass?: string | ((row: T) => string);

    /** For currency type: currency symbol (default: 'S/') */
    currencySymbol?: string;

    /** For number/currency/percentage: number of decimal places */
    decimals?: number;

    /** For badge type: function to determine badge color/class */
    badgeClass?: (row: T) => string;

    /** For link type: function to generate the link URL */
    linkUrl?: (row: T) => string;

    /** For date type: date format string */
    dateFormat?: string;

    /** Whether to show this column on mobile devices */
    showOnMobile?: boolean;
}

/**
 * Configuration for table actions
 */
export interface TableAction<T = any> {
    /** Unique identifier for the action */
    id: string;

    /** Icon name (Material icon) */
    icon: string;

    /** Tooltip text */
    tooltip: string;

    /** CSS color or class */
    color?: 'primary' | 'accent' | 'warn' | string;

    /** Function to determine if action should be visible for this row */
    visible?: (row: T) => boolean;

    /** Function to determine if action should be disabled for this row */
    disabled?: (row: T) => boolean;

    /** Handler function when action is clicked */
    handler: (row: T) => void;
}
