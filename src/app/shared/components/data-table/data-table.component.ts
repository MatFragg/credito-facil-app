import { Component, Input, Output, EventEmitter, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TableColumn, TableAction } from '../../models/table-column.model';
import { DataTableConfig } from '../../models/table-config.model';

/**
 * Generic reusable data table component
 * Supports various column types, pagination, actions, and custom rendering
 */
@Component({
    selector: 'app-data-table',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DataTableComponent<T = any> implements OnInit {
    /** Table columns configuration */
    @Input() columns: TableColumn<T>[] = [];

    /** Data source for the table */
    @Input() data: T[] = [];

    /** Table configuration */
    @Input() config: DataTableConfig<T> = {
        pagination: {
            enabled: true,
            pageSize: 10,
            pageSizeOptions: [5, 10, 25, 50],
            showFirstLastButtons: true
        },
        hoverableRows: true,
        clickableRows: false,
        showLoadingSpinner: true,
        loadingMessage: 'Cargando datos...',
        emptyMessage: 'No se encontraron registros'
    };

    /** Loading state */
    @Input() isLoading: boolean = false;

    /** Action buttons configuration */
    @Input() actions: TableAction<T>[] = [];

    /** Emits when a row is clicked */
    @Output() rowClick = new EventEmitter<T>();

    /** Emits when an action is triggered */
    @Output() actionClick = new EventEmitter<{ action: TableAction<T>, row: T }>();

    // Pagination signals
    pageSize = signal(10);
    pageIndex = signal(0);

    // Computed paginated data
    pageData = computed(() => {
        if (!this.config.pagination?.enabled) {
            return this.data;
        }
        const start = this.pageIndex() * this.pageSize();
        const end = start + this.pageSize();
        return this.data.slice(start, end);
    });

    // Displayed columns (includes 'actions' if actions are defined)
    displayedColumns = computed(() => {
        const cols = this.columns.map(c => c.key);
        if (this.actions.length > 0) {
            cols.push('actions');
        }
        return cols;
    });

    ngOnInit(): void {
        // Set initial page size from config
        if (this.config.pagination?.pageSize) {
            this.pageSize.set(this.config.pagination.pageSize);
        }
    }

    onRowClick(row: T): void {
        if (this.config.clickableRows) {
            this.rowClick.emit(row);
        }
    }

    onActionClick(action: TableAction<T>, row: T, event: Event): void {
        event.stopPropagation(); // Prevent row click
        if (!action.disabled || !action.disabled(row)) {
            action.handler(row);
            this.actionClick.emit({ action, row });
        }
    }

    onPageChange(event: PageEvent): void {
        this.pageIndex.set(event.pageIndex);
        this.pageSize.set(event.pageSize);
    }

    isActionVisible(action: TableAction<T>, row: T): boolean {
        return !action.visible || action.visible(row);
    }

    isActionDisabled(action: TableAction<T>, row: T): boolean {
        return action.disabled ? action.disabled(row) : false;
    }

    getCellValue(row: T, column: TableColumn<T>): any {
        return (row as any)[column.key];
    }

    getCellClass(row: T, column: TableColumn<T>): string {
        if (typeof column.cssClass === 'function') {
            return column.cssClass(row);
        }
        return column.cssClass || '';
    }

    formatCurrency(value: number, symbol: string = 'S/'): string {
        return `${symbol} ${value.toLocaleString()}`;
    }

    formatPercentage(value: number, decimals: number = 0): string {
        return `${value.toFixed(decimals)}%`;
    }

    formatNumber(value: number, decimals: number = 0): string {
        return value.toFixed(decimals);
    }
}
