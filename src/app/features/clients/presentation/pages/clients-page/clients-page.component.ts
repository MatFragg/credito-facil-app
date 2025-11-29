import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { StatCardComponent } from '../../../../../shared/components/stat-card/stat-card.component';
import { HeaderConfig } from '../../../../../shared/models/header-config.model';
import { StatCardData } from '../../../../../shared/models/stat-card.models';
import { TableColumn, TableAction } from '../../../../../shared/models/table-column.model';
import { DataTableConfig } from '../../../../../shared/models/table-config.model';
import { ClientsFacade } from '../../state/clients.facade';
import { Client, ClientHelpers } from '../../../domain/models/client.model';
import { getEvaluationStatusLabel, getEvaluationStatusClass } from '../../../domain/models/evaluation-status.enum';
import { ClientFormComponent, ClientFormDialogData, ClientFormResult } from '../../components/client-form/client-form.component';

/**
 * Clients Page Component
 * Main view for client management
 */
@Component({
    selector: 'app-clients-page',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        DataTableComponent,
        StatCardComponent
    ],
    templateUrl: './clients-page.component.html',
    styleUrls: ['./clients-page.component.css'],
    providers: [ClientsFacade]
})
export class ClientsPageComponent implements OnInit {
    // Header configuration
    headerConfig: HeaderConfig = {
        title: 'Gestión de Clientes',
        subtitle: 'Administre la información de los clientes',
        search: {
            placeholder: 'Buscar cliente por DNI...',
            value: '',
            onSearch: (query: string) => this.onSearch(query)
        },
        actions: [
            {
                type: 'button',
                label: 'Nuevo Cliente',
                icon: 'add',
                color: 'primary',
                raised: true,
                handler: () => this.openCreateModal()
            }
        ]
    };

    // Stat cards configuration
    statCards = signal<StatCardData[]>([
        {
            label: 'Total Clientes',
            value: '0',
            delta: '+0%',
            deltaText: 'vs mes anterior',
            iconName: 'people',
            iconBgClass: 'blue-bg'
        },
        {
            label: 'Ingreso Promedio',
            value: 'S/ 0',
            delta: '+0%',
            deltaText: 'vs mes anterior',
            iconName: 'payments',
            iconBgClass: 'lightgreen-bg'
        },
        {
            label: 'Nuevos Este Mes',
            value: '0',
            delta: '+0%',
            deltaText: 'vs mes anterior',
            iconName: 'person_add',
            iconBgClass: 'yellow-bg'
        },
        {
            label: 'Con Simulaciones',
            value: '0',
            delta: '+0%',
            deltaText: 'de conversión',
            iconName: 'assessment',
            iconBgClass: 'purple-bg'
        }
    ]);

    // Table columns configuration
    tableColumns: TableColumn<Client>[] = [
        {
            key: 'dni',
            label: 'DNI',
            type: 'text',
            width: '120px',
            sortable: true
        },
        {
            key: 'fullName',
            label: 'Nombre',
            type: 'custom',
            cellTemplate: (row: Client) => ClientHelpers.getFullName(row),
            sortable: true
        },
        {
            key: 'phone',
            label: 'Teléfono',
            type: 'text',
            width: '130px'
        },
        {
            key: 'email',
            label: 'Email',
            type: 'text'
        },
        {
            key: 'monthlyIncome',
            label: 'Ingreso S/',
            type: 'currency',
            currencySymbol: 'S/',
            decimals: 2,
            width: '150px',
            sortable: true,
            cssClass: 'text-right'
        },
        {
            key: 'evaluationStatus',
            label: 'Estado',
            type: 'badge',
            width: '120px',
            cellTemplate: (row: Client) => getEvaluationStatusLabel(row.evaluationStatus),
            badgeClass: (row: Client) => getEvaluationStatusClass(row.evaluationStatus)
        }
    ];

    // Table actions configuration
    tableActions: TableAction<Client>[] = [
        {
            id: 'edit',
            icon: 'edit',
            tooltip: 'Editar cliente',
            color: 'primary',
            handler: (client: Client) => this.onEdit(client)
        },
        {
            id: 'delete',
            icon: 'delete',
            tooltip: 'Eliminar cliente',
            color: 'warn',
            handler: (client: Client) => this.onDelete(client)
        }
    ];

    // Table configuration
    tableConfig: DataTableConfig<Client> = {
        pagination: {
            enabled: true,
            pageSize: 10,
            pageSizeOptions: [5, 10, 25, 50],
            showFirstLastButtons: true
        },
        hoverableRows: true,
        clickableRows: false,
        showLoadingSpinner: true,
        loadingMessage: 'Cargando clientes...',
        emptyMessage: 'No se encontraron clientes'
    };

    constructor(
        public facade: ClientsFacade,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
        // Watch for stats changes and update cards
        effect(() => {
            const stats = this.facade.stats();
            this.updateStatCardsWithData(stats);
        });
    }

    ngOnInit(): void {
        // Load initial data
        this.facade.loadAll();
    }

    /**
     * Update stat cards with real data
     */
    private updateStatCardsWithData(stats: any): void {
        this.statCards.update(cards => [
            {
                ...cards[0],
                value: stats.total.toString()
            },
            {
                ...cards[1],
                value: `S/ ${stats.averageIncome.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            },
            {
                ...cards[2],
                value: stats.newThisMonth.toString()
            },
            {
                ...cards[3],
                value: stats.withSimulations.toString()
            }
        ]);
    }

    /**
     * Handle search
     */
    onSearch(query: string): void {
        if (!query || query.trim().length === 0) {
            this.facade.clearSearch();
            return;
        }

        // Search by DNI
        this.facade.searchByDni(query.trim());
    }

    /**
     * Navigate to create client page
     */
    openCreateModal(): void {
        this.router.navigate(['/clients/new']);
    }

    /**
     * Handle edit action - Opens modal
     */
    onEdit(client: Client): void {
        const dialogData: ClientFormDialogData = {
            mode: 'edit',
            client: client
        };

        const dialogRef = this.dialog.open(ClientFormComponent, {
            width: '800px',
            maxWidth: '95vw',
            disableClose: true,
            data: dialogData
        });

        dialogRef.afterClosed().subscribe((result: ClientFormResult | null) => {
            if (result) {
                this.facade.update(client.id, result.data);
                this.snackBar.open('Cliente actualizado exitosamente', 'Cerrar', {
                    duration: 3000,
                    horizontalPosition: 'end',
                    verticalPosition: 'bottom'
                });
            }
        });
    }

    /**
     * Handle delete action
     */
    onDelete(client: Client): void {
        if (confirm(`¿Está seguro de eliminar al cliente ${ClientHelpers.getFullName(client)}?`)) {
            this.facade.delete(client.id);
            this.snackBar.open('Cliente eliminado exitosamente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'bottom'
            });
        }
    }

    /**
     * Handle page change
     */
    onPageChange(page: number, size: number): void {
        this.facade.loadAll(page, size);
    }
}
