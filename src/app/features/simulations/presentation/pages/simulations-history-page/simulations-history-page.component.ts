import { Component, OnInit, effect } from '@angular/core';
import { SimulationFacade } from '../../state/simulation.facade';
import { ClientsFacade } from '../../../../clients/presentation/state/clients.facade';
import { PropertiesFacade } from '../../../../properties/presentation/state/properties.facade';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { StatsCardsComponent } from '../../../../../shared/components/stats-cards/stats-cards.component';
import { DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { FilterBarComponent } from '../../../../../shared/components/filter-bar/filter-bar.component';
import { StatCardData } from '../../../../../shared/models/stat-card.models';
import { TableColumn, TableAction } from '../../../../../shared/models/table-column.model';
import { DataTableConfig } from '../../../../../shared/models/table-config.model';
import { FilterBarConfig, FilterValues } from '../../../../../shared/models/filter-field.model';
import { Simulation, SimulationHelpers } from '../../../domain/models/simulation.model';
import { SimulationStatus, SimulationStatusLabels } from '../../../domain/models/simulation-status.enum';
import { Client, ClientHelpers } from '../../../../clients/domain/models/client.model';
import { Property } from '../../../../properties/domain/models/property.model';

interface SimulationRow extends Simulation {
    client?: Client;
    property?: Property;
}

@Component({
    selector: 'app-simulations-history-page',
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
        MatMenuModule,
        StatsCardsComponent,
        DataTableComponent,
        FilterBarComponent
    ],
    templateUrl: './simulations-history-page.component.html',
    styleUrls: ['./simulations-history-page.component.css']
})
export class SimulationsHistoryPageComponent implements OnInit {
    // Filters (keeping for backward compatibility, can be removed later)
    searchQuery: string = '';
    clientFilter: string = '';
    dateFrom: string = '';
    dateTo: string = '';
    amountRange: string = 'all';

    // Data
    simulations: SimulationRow[] = [];
    isLoading: boolean = false;

    // Filter Bar Configuration
    filterConfig: FilterBarConfig = {
        title: 'Filtros',
        showClearButton: true,
        clearButtonText: 'Limpiar filtros',
        layoutMode: 'horizontal',
        containerStyle: 'card',
        applyMode: 'auto',
        fields: [
            {
                id: 'clientFilter',
                type: 'text',
                label: 'Cliente',
                placeholder: 'Nombre del cliente'
            },
            {
                id: 'dateFrom',
                type: 'date',
                label: 'Fecha desde',
                placeholder: 'mm/dd/yyyy'
            },
            {
                id: 'dateTo',
                type: 'date',
                label: 'Fecha hasta',
                placeholder: 'mm/dd/yyyy'
            },
            {
                id: 'amountRange',
                type: 'select',
                label: 'Rango de monto',
                placeholder: 'Todos los montos',
                options: [
                    { value: 'all', label: 'Todos los montos' },
                    { value: '0-200000', label: 'S/ 0 - S/ 200,000' },
                    { value: '200000-400000', label: 'S/ 200,000 - S/ 400,000' },
                    { value: '400000-600000', label: 'S/ 400,000 - S/ 600,000' },
                    { value: '600000+', label: 'S/ 600,000+' }
                ]
            }
        ]
    };

    // Stats cards data
    statsCards: StatCardData[] = [
        {
            label: 'Total Simulaciones',
            value: 247,
            delta: '',
            deltaText: '',
            iconName: 'description',
            iconBgClass: 'blue-bg'
        },
        {
            label: 'Este Mes',
            value: 43,
            delta: '',
            deltaText: '',
            iconName: 'calendar_today',
            iconBgClass: 'lightgreen-bg'
        },
        {
            label: 'Monto Promedio',
            value: 'S/ 285K',
            delta: '',
            deltaText: '',
            iconName: 'attach_money',
            iconBgClass: 'yellow-bg'
        },
        {
            label: 'Guardadas',
            value: 156,
            delta: '',
            deltaText: '',
            iconName: 'bookmark',
            iconBgClass: 'purple-bg'
        }
    ];

    // Table configuration
    tableColumns: TableColumn<SimulationRow>[] = [
        {
            key: 'createdAt',
            label: 'Fecha',
            type: 'date',
            sortable: true
        },
        {
            key: 'client',
            label: 'Cliente',
            type: 'custom',
            cellTemplate: (row) => {
                const client = row.client;
                if (!client) return 'N/A';
                const initial = ClientHelpers.getFullName(client).charAt(0);
                const name = ClientHelpers.getFullName(client);
                const dni = client.dni || '';
                return `
                    <div class="client-cell">
                        <div class="client-avatar">${initial}</div>
                        <div class="client-info">
                            <div class="client-name">${name}</div>
                            <div class="client-dni">DNI: ${dni}</div>
                        </div>
                    </div>
                `;
            }
        },
        {
            key: 'property',
            label: 'Vivienda',
            type: 'custom',
            cellTemplate: (row) => row.property?.propertyName || row.property?.projectName || 'N/A'
        },
        {
            key: 'propertyPrice',
            label: 'Monto',
            type: 'currency',
            sortable: true
        },
        {
            key: 'monthlyPayment',
            label: 'Cuota',
            type: 'currency'
        },
        {
            key: 'termYears',
            label: 'Plazo',
            type: 'text',
            cellTemplate: (row) => `${row.termYears} años`
        },
        {
            key: 'status',
            label: 'Estado',
            type: 'badge',
            cssClass: (row) => `status-${row.status.toLowerCase()}`,
            cellTemplate: (row) => SimulationStatusLabels[row.status as SimulationStatus]
        }
    ];

    tableActions: TableAction<SimulationRow>[] = [
        {
            id: 'view',
            icon: 'visibility',
            tooltip: 'Ver detalles',
            color: 'primary',
            handler: (row) => this.onViewDetails(row)
        },
        {
            id: 'edit',
            icon: 'edit',
            tooltip: 'Editar',
            color: 'accent',
            handler: (row) => this.onEdit(row)
        },
        {
            id: 'delete',
            icon: 'delete',
            tooltip: 'Eliminar',
            color: 'warn',
            handler: (row) => this.onDelete(row)
        }
    ];

    tableConfig: DataTableConfig<SimulationRow> = {
        pagination: {
            enabled: true,
            pageSize: 10,
            pageSizeOptions: [10, 25, 50],
            showFirstLastButtons: true
        },
        hoverableRows: true,
        clickableRows: false,
        showLoadingSpinner: true,
        loadingMessage: 'Cargando simulaciones...',
        emptyMessage: 'No se encontraron simulaciones'
    };

    // Pagination state
    pageIndex: number = 0;
    pageSize: number = 10;

    constructor(
        private router: Router,
        public facade: SimulationFacade,
        public clientsFacade: ClientsFacade,
        public propertiesFacade: PropertiesFacade
    ) {
        // React to changes in signals to hydrate data
        effect(() => {
            const paginated = this.facade.mySimulations();
            const clients = this.clientsFacade.clients();
            const properties = this.propertiesFacade.properties()?.content || [];

            if (paginated && clients.length > 0 && properties.length > 0) {
                this.simulations = paginated.content.map(sim => {
                    const client = clients.find(c => c.id === sim.clientId);
                    const property = properties.find(p => p.id === sim.propertyId);
                    return { ...sim, client, property };
                });
            } else if (paginated) {
                // Fallback if auxiliary data not yet loaded
                this.simulations = paginated.content;
            }

            this.isLoading = this.facade.loadingHistory() ||
                this.clientsFacade.loading() ||
                this.propertiesFacade.loading();
        });
    }

    ngOnInit(): void {
        // Load auxiliary data for hydration
        this.clientsFacade.loadAll(0, 100);
        this.propertiesFacade.loadProperties(0, 100);

        this.loadSimulations();
    }

    loadSimulations(): void {
        this.facade.loadMySimulations(this.pageIndex, this.pageSize);
    }

    onSearch(): void {
        // TODO: Implement search logic with backend filtering if available
        // For now, we just reload the list
        this.pageIndex = 0; // Reset to first page on search
        this.loadSimulations();
    }

    onFilterChange(filters: FilterValues): void {
        // Update internal filter state
        this.clientFilter = filters['clientFilter'] || '';
        this.dateFrom = filters['dateFrom'] || '';
        this.dateTo = filters['dateTo'] || '';
        this.amountRange = filters['amountRange'] || 'all';

        // Reset to first page and reload
        this.pageIndex = 0;
        this.loadSimulations();

        // TODO: Implement actual filtering logic with backend API
        console.log('Filters changed:', filters);
    }

    onClearFilters(): void {
        this.searchQuery = '';
        this.clientFilter = '';
        this.dateFrom = '';
        this.dateTo = '';
        this.amountRange = 'all';
        this.pageIndex = 0;
        this.loadSimulations();
    }

    onNewSimulation(): void {
        this.router.navigate(['/simulations/calculator']);
    }

    onViewDetails(simulation: SimulationRow): void {
        this.router.navigate(['/simulations', simulation.id]);
    }

    onEdit(simulation: SimulationRow): void {
        this.router.navigate(['/simulations/calculator'], {
            queryParams: { id: simulation.id }
        });
    }

    onDelete(simulation: SimulationRow): void {
        if (confirm(`¿Estás seguro de que deseas eliminar la simulación ${simulation.simulationCode || simulation.id}?`)) {
            // TODO: Implement delete logic in facade
            console.log('Delete simulation:', simulation.id);
        }
    }

    onExport(format: 'pdf' | 'excel'): void {
        // TODO: Implement export logic
        console.log(`Exporting as ${format}`);
    }

    onPageChange(event: any): void {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadSimulations();
    }
}
