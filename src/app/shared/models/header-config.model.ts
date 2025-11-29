/**
 * Configuration model for the reusable header component
 */
export interface HeaderConfig {
    /** Main title displayed in the header */
    title: string;

    /** Optional subtitle displayed below the title */
    subtitle?: string;

    /** Optional back button configuration (e.g., for forms) */
    backButton?: {
        label: string;
        action: () => void;
    };

    /** Optional action buttons (e.g., "Actualizar Tasas", "Nueva Simulación") */
    actions?: HeaderAction[];

    /** Optional search input configuration */
    search?: {
        placeholder: string;
        value?: string;
        onSearch: (query: string) => void;
    };

    /** Whether to show the notification bell icon */
    showNotifications?: boolean;

    /** Number of unread notifications (shows badge) */
    notificationCount?: number;

    /** Callback when notification icon is clicked */
    onNotificationClick?: () => void;

    /** Whether to show user info section (defaults to true) */
    showUserInfo?: boolean;
}

/**
 * Configuration for individual header action buttons
 */
export interface HeaderAction {
    /** Type of action element */
    type: 'button' | 'icon';

    /** Button label (for button type) */
    label?: string;

    /** Material icon name */
    icon?: string;

    /** Material button color */
    color?: 'primary' | 'accent' | 'warn';

    /** Whether button should be raised (mat-raised-button vs mat-button) */
    raised?: boolean;

    /** Click handler function */
    handler: () => void;
}
