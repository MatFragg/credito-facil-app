import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SimulationFacade } from '../../state/simulation.facade';
import { ClientsFacade } from '../../../../clients/presentation/state/clients.facade';
import { PropertiesFacade } from '../../../../properties/presentation/state/properties.facade';
import { BankEntitiesFacade } from '../../../../bank-entities/presentation/state/bank-entities.facade';
import { Simulation } from '../../../domain/models/simulation.model';
import { Client } from '../../../../clients/domain/models/client.model';
import { Property } from '../../../../properties/domain/models/property.model';
import { BankEntity } from '../../../../bank-entities/domain/models/bank-entity.model';
import { DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';

@Component({
    selector: 'app-simulation-details-page',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatCardModule,
        MatTooltipModule,
        DataTableComponent
    ],
    templateUrl: './simulation-details-page.component.html',
    styleUrls: ['./simulation-details-page.component.css']
})
export class SimulationDetailsPageComponent implements OnInit {
    simulationId = signal<number | null>(null);
    simulation = signal<Simulation | null>(null);
    client = signal<Client | null>(null);
    property = signal<Property | null>(null);
    bankEntity = signal<BankEntity | null>(null);

    loading = signal<boolean>(false);
    error = signal<string | null>(null);

    // Payment schedule columns - ALL columns from backend PaymentScheduleResponse
    scheduleColumns = [
        { key: 'paymentNumber', label: 'N°', type: 'number' as const },
        { key: 'paymentDate', label: 'Fecha', type: 'date' as const, dateFormat: 'dd/MM/yyyy' },
        { key: 'initialBalance', label: 'Saldo Inicial', type: 'currency' as const },
        { key: 'payment', label: 'Cuota', type: 'currency' as const },
        { key: 'principal', label: 'Amortización', type: 'currency' as const },
        { key: 'interest', label: 'Interés', type: 'currency' as const },
        { key: 'finalBalance', label: 'Saldo Final', type: 'currency' as const },
        { key: 'lifeInsurance', label: 'Seguro de Vida', type: 'currency' as const },
        { key: 'propertyInsurance', label: 'Seguro Inmueble', type: 'currency' as const },
        { key: 'totalPayment', label: 'Total a Pagar', type: 'currency' as const }
    ];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public simulationFacade: SimulationFacade,
        private clientsFacade: ClientsFacade,
        private propertiesFacade: PropertiesFacade,
        private bankEntitiesFacade: BankEntitiesFacade
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id && !isNaN(id)) {
                this.simulationId.set(id);
                this.loadSimulationAndRelatedData(id);
            } else {
                this.error.set('ID de simulación inválido');
            }
        });
    }

    loadSimulationAndRelatedData(simulationId: number): void {
        this.loading.set(true);
        this.error.set(null);

        // Load all simulations first
        this.simulationFacade.loadMySimulations();

        // Wait a bit for data to load
        setTimeout(() => {
            const simulations = this.simulationFacade.mySimulations();
            const foundSimulation = simulations?.content.find((s: Simulation) => s.id === simulationId);

            if (!foundSimulation) {
                this.error.set('Simulación no encontrada');
                this.loading.set(false);
                return;
            }

            this.simulation.set(foundSimulation);

            // Load payment schedule
            if (foundSimulation.id) {
                this.simulationFacade.loadPaymentSchedule(foundSimulation.id);
            }

            // Load related entities
            this.loadClient(foundSimulation.clientId);
            this.loadProperty(foundSimulation.propertyId);
            this.loadBankEntity(foundSimulation.bankEntityId);

            this.loading.set(false);
        }, 500);
    }

    private loadClient(clientId: number): void {
        this.clientsFacade.loadAll();
        setTimeout(() => {
            const clients = this.clientsFacade.clients();
            const foundClient = clients?.find((c: Client) => c.id === clientId);
            this.client.set(foundClient || null);
        }, 300);
    }

    private loadProperty(propertyId: number): void {
        this.propertiesFacade.loadProperties();
        setTimeout(() => {
            const properties = this.propertiesFacade.properties();
            const foundProperty = properties?.content.find((p: Property) => p.id === propertyId);
            this.property.set(foundProperty || null);
        }, 300);
    }

    private loadBankEntity(bankEntityId: number): void {
        this.bankEntitiesFacade.loadAll();
        setTimeout(() => {
            const banks = this.bankEntitiesFacade.entities();
            const foundBank = banks?.find((b: BankEntity) => b.id === bankEntityId);
            this.bankEntity.set(foundBank || null);
        }, 300);
    }

    goBack(): void {
        this.router.navigate(['/simulations']);
    }

    cloneSimulation(): void {
        const sim = this.simulation();
        if (sim) {
            this.router.navigate(['/simulations/calculator'], {
                queryParams: {
                    clientId: sim.clientId,
                    propertyId: sim.propertyId,
                    bankEntityId: sim.bankEntityId,
                    clone: sim.id
                }
            });
        }
    }

    exportToPDF(): void {
        // TODO: Implement PDF export
        alert('Exportar a PDF - Funcionalidad pendiente');
    }

    deleteSimulation(): void {
        const sim = this.simulation();
        if (sim && confirm(`¿Estás seguro de eliminar la simulación "${sim.simulationCode}"?`)) {
            // TODO: Implement delete via facade
            alert('Eliminar simulación - Funcionalidad pendiente');
            this.router.navigate(['/simulations']);
        }
    }

    // Helper methods for template
    formatCurrency(value: number | undefined): string {
        if (value === undefined || value === null) return 'S/ 0';
        return `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }

    formatPercentage(value: number | undefined): string {
        if (value === undefined || value === null) return '0.00%';
        return `${value.toFixed(2)}%`;
    }

    getStatusLabel(): string {
        const sim = this.simulation();
        if (!sim) return '';

        const status = sim.status as string;
        switch (status) {
            case 'DRAFT': return 'Borrador';
            case 'ACTIVE': return 'Activa';
            case 'APPROVED': return 'Aprobada';
            case 'REJECTED': return 'Rechazada';
            default: return status;
        }
    }

    getStatusColor(): string {
        const sim = this.simulation();
        if (!sim) return 'default';

        const status = sim.status as string;
        switch (status) {
            case 'ACTIVE': return 'primary';
            case 'APPROVED': return 'accent';
            case 'REJECTED': return 'warn';
            default: return 'default';
        }
    }

    getBonusTypeLabel(): string {
        const sim = this.simulation();
        if (!sim || !sim.bonusType) return 'N/A';

        const bonusType = sim.bonusType as string;
        switch (bonusType) {
            case 'BFH': return 'Bono Familiar Habitacional';
            case 'MBFH': return 'Bono Familiar Habitacional (Modalidad)';
            case 'PBP_STANDARD': return 'PBP Estándar';
            case 'PBP_PLUS': return 'PBP Plus';
            default: return bonusType || 'N/A';
        }
    }
}