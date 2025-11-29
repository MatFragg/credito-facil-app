/**
 * Configuration for pagination in data tables
 */
export interface TablePaginationConfig {
    /** Available page size options */
    pageSizeOptions?: number[];

    /** Initial page size */
    pageSize?: number;

    /** Whether to show "first page" and "last page" buttons */
    showFirstLastButtons?: boolean;

    /** Whether pagination is enabled */
    enabled?: boolean;
}

/**
 * Configuration for the entire data table
 */
export interface DataTableConfig<T = any> {
    /** Whether the table has a sticky header */
    stickyHeader?: boolean;

    /** Whether rows are hoverable */
    hoverableRows?: boolean;

    /** Whether rows are clickable */
    clickableRows?: boolean;

    /** Pagination configuration */
    pagination?: TablePaginationConfig;

    /** Loading state message */
    loadingMessage?: string;

    /** Empty state message */
    emptyMessage?: string;

    /** Whether to show loading spinner */
    showLoadingSpinner?: boolean;

    /** CSS class for the table */
    tableClass?: string;
}
