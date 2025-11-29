/**
 * Configuration interface for the list card container
 */
export interface ListCardConfig {
    /** Card title displayed in the header */
    title: string;

    /** Optional footer button configuration */
    footerButton?: {
        label: string;
        icon?: string;
        action: () => void;
    };

    /** Maximum number of items to display */
    maxItems?: number;

    /** Whether to show dividers between items */
    showDividers?: boolean;

    /** Custom CSS class for the card */
    cardClass?: string;
}

/**
 * Configuration interface for individual list items
 * Supports flexible leading/main/trailing layout
 */
export interface ListItemConfig<T = any> {
    /** Leading section configuration (left side) */
    leading?: {
        type: 'avatar' | 'icon' | 'badge' | 'none';
        /** Function to get content (avatar URL, icon name, or badge text) */
        content: (item: T) => string;
        /** Optional CSS class function */
        cssClass?: (item: T) => string;
    };

    /** Main section configuration (center) */
    main: {
        /** Function to get the main title */
        title: (item: T) => string;
        /** Optional function to get subtitle */
        subtitle?: (item: T) => string;
    };

    /** Trailing section configuration (right side) */
    trailing?: {
        type: 'badge' | 'price' | 'text' | 'icon' | 'custom';
        /** Function to get content */
        content: (item: T) => string;
        /** Optional label (used for 'price' type) */
        label?: (item: T) => string;
        /** Optional CSS class function */
        cssClass?: (item: T) => string;
    };

    /** Optional click handler for the entire item */
    onClick?: (item: T) => void;

    /** Whether items are clickable (shows hover effect) */
    clickable?: boolean;
}
