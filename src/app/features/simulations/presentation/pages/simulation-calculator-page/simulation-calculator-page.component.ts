import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SimulationFacade } from '../../state/simulation.facade';
import { getBonusTypeOptions } from '../../../domain/models/bonus-type.enum';
import { SimulationStatus } from '../../../domain/models/simulation-status.enum';
import { CreateSimulationData, UpdateSimulationData, Simulation } from '../../../domain/models/simulation.model';
import { DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { TableColumn } from '../../../../../shared/models/table-column.model';
import { PaymentSchedule } from '../../../domain/models/payment-schedule.model';
import { BaseFormComponent } from '../../../../../shared/components/base-form/base-form.component';
import { ClientsFacade } from '../../../../clients/presentation/state/clients.facade';
import { Client, ClientHelpers } from '../../../../clients/domain/models/client.model';
import { PropertiesFacade } from '../../../../properties/presentation/state/properties.facade';
import { Property, PropertyHelpers } from '../../../../properties/domain/models/property.model';
import { BankEntitiesFacade } from '../../../../bank-entities/presentation/state/bank-entities.facade';
import { BankEntity } from '../../../../bank-entities/domain/models/bank-entity.model';

@Component({
    selector: 'app-simulation-calculator-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatSliderModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        DataTableComponent
    ],
    templateUrl: './simulation-calculator-page.component.html',
    styleUrls: ['./simulation-calculator-page.component.css']
})
export class SimulationCalculatorPageComponent extends BaseFormComponent implements OnInit {
    bonusTypes = getBonusTypeOptions();

    // Autocomplete data
    allClients: Client[] = [];
    allProperties: Property[] = [];
    allBankEntities: BankEntity[] = [];

    // Filtered autocomplete observables
    filteredClients$!: Observable<Client[]>;
    filteredProperties$!: Observable<Property[]>;
    filteredBankEntities$!: Observable<BankEntity[]>;

    // Selected items
    selectedClient: Client | null = null;
    selectedProperty: Property | null = null;
    selectedBankEntity: BankEntity | null = null;

    scheduleColumns: TableColumn<PaymentSchedule>[] = [
        { key: 'paymentNumber', label: 'N°', type: 'number' },
        { key: 'paymentDate', label: 'Fecha', type: 'date', dateFormat: 'dd/MM/yyyy' },
        { key: 'initialBalance', label: 'Saldo Inicial', type: 'currency' },
        { key: 'payment', label: 'Cuota', type: 'currency' },
        { key: 'principal', label: 'Capital', type: 'currency' },
        { key: 'interest', label: 'Interés', type: 'currency' },
        { key: 'finalBalance', label: 'Saldo Final', type: 'currency' },
        { key: 'lifeInsurance', label: 'Seguro Vida', type: 'currency' },
        { key: 'propertyInsurance', label: 'Seguro Propiedad', type: 'currency' },
        { key: 'totalPayment', label: 'Total', type: 'currency' }
    ];

    constructor(
        private fb: FormBuilder,
        public facade: SimulationFacade,
        public clientsFacade: ClientsFacade,
        public propertiesFacade: PropertiesFacade,
        public bankEntitiesFacade: BankEntitiesFacade,
        private snackBar: MatSnackBar
    ) {
        super();

        // Use effects to reactively update data when signals change
        effect(() => {
            this.allClients = this.clientsFacade.clients();
            console.log('DEBUG: Clients loaded:', this.allClients.length);
        });

        effect(() => {
            const paginated = this.propertiesFacade.properties();
            this.allProperties = paginated ? paginated.content : [];
            console.log('DEBUG: Properties loaded:', this.allProperties.length, this.allProperties);
        });

        effect(() => {
            this.allBankEntities = this.bankEntitiesFacade.entities();
            console.log('DEBUG: Bank Entities loaded:', this.allBankEntities.length);
        });
    }

    buildForm(): void {
        this.form = this.fb.group({
            clientId: [null, Validators.required],
            clientSearch: [''], // For autocomplete display
            propertyId: [null, Validators.required],
            propertySearch: [''], // For autocomplete display
            bankEntityId: [null, Validators.required],
            bankEntitySearch: [''], // For autocomplete display
            settingsId: [1, Validators.required],
            simulationName: [''],
            propertyPrice: [null, [Validators.required, Validators.min(0.01)]],
            downPayment: [null, [Validators.required, Validators.min(0)]],
            applyGovernmentBonus: [false],
            governmentBonusAmount: [0],
            bonusType: [null],
            annualRate: [null, [Validators.required, Validators.min(0.01), Validators.max(100)]],
            termYears: [20, [Validators.required, Validators.min(1), Validators.max(30)]],
            lifeInsuranceRate: [0.0005],
            propertyInsurance: [50],
            openingCommission: [0],
            notaryFees: [0],
            registrationFees: [0],
            applyPBP: [false],
            desgravamenRate: [0.00049]
        });

        this.form.get('applyGovernmentBonus')?.valueChanges.subscribe(apply => {
            if (!apply) {
                this.form.patchValue({ governmentBonusAmount: 0, bonusType: null });
            }
        });

        // Setup autocomplete filtering
        this.filteredClients$ = this.form.get('clientSearch')!.valueChanges.pipe(
            startWith(''),
            map(value => {
                console.log('DEBUG: Client search value:', value);
                return this._filterClients(value || '');
            })
        );

        this.filteredProperties$ = this.form.get('propertySearch')!.valueChanges.pipe(
            startWith(''),
            map(value => {
                console.log('DEBUG: Property search value:', value);
                return this._filterProperties(value || '');
            })
        );

        this.filteredBankEntities$ = this.form.get('bankEntitySearch')!.valueChanges.pipe(
            startWith(''),
            map(value => {
                console.log('DEBUG: Bank Entity search value:', value);
                return this._filterBankEntities(value || '');
            })
        );
    }

    override ngOnInit(): void {
        super.ngOnInit();
        console.log('DEBUG: ngOnInit called - Loading all data');
        // Load all data for autocomplete
        this.clientsFacade.loadAll(0, 100);
        this.propertiesFacade.loadProperties(0, 100);
        this.bankEntitiesFacade.loadAll();
    }

    private _filterClients(value: string): Client[] {
        const filterValue = value.toLowerCase();
        const result = this.allClients.filter(client =>
            ClientHelpers.getFullName(client).toLowerCase().includes(filterValue) ||
            (client.dni && client.dni.includes(filterValue))
        );
        console.log('DEBUG: Filtered clients:', result.length);
        return result;
    }

    private _filterProperties(value: string): Property[] {
        const filterValue = value.toLowerCase();
        const result = this.allProperties.filter(property =>
            (property.propertyName && property.propertyName.toLowerCase().includes(filterValue)) ||
            (property.propertyCode && property.propertyCode.toLowerCase().includes(filterValue)) ||
            (property.projectName && property.projectName.toLowerCase().includes(filterValue))
        );
        console.log('DEBUG: Filtered properties:', result.length);
        return result;
    }

    private _filterBankEntities(value: string): BankEntity[] {
        const filterValue = value.toLowerCase();
        const result = this.allBankEntities.filter(entity =>
            entity.name.toLowerCase().includes(filterValue)
        );
        console.log('DEBUG: Filtered bank entities:', result.length);
        return result;
    }

    displayClient(client: Client | null): string {
        if (!client) return '';
        const name = ClientHelpers.getFullName(client);
        const dni = client.dni ? ` (DNI: ${client.dni})` : '';
        return `${name}${dni}`;
    }

    displayProperty(property: Property | null): string {
        if (!property) return '';
        const name = property.propertyName || property.projectName || property.propertyCode || 'Sin nombre';
        const code = property.propertyCode ? ` (${property.propertyCode})` : '';
        return `${name}${code}`;
    }

    displayBankEntity(entity: BankEntity | null): string {
        return entity ? entity.name : '';
    }

    onClientSelected(client: Client): void {
        this.selectedClient = client;
        this.form.patchValue({ clientId: client.id });
    }

    onPropertySelected(property: Property): void {
        this.selectedProperty = property;
        this.form.patchValue({
            propertyId: property.id,
            propertyPrice: property.price
        });
    }

    onBankEntitySelected(entity: BankEntity): void {
        this.selectedBankEntity = entity;
        this.form.patchValue({
            bankEntityId: entity.id,
            annualRate: entity.currentRate
        });
    }

    submitForm(): Observable<Simulation> {
        const currentSimulation = this.facade.currentSimulation();

        if (currentSimulation?.id) {
            const updateData: UpdateSimulationData = {
                ...this.getFormPayload(),
                status: SimulationStatus.SAVED
            };
            this.facade.updateSimulation(currentSimulation.id, updateData);
        } else {
            const createData: CreateSimulationData = {
                ...this.getFormPayload(),
                status: SimulationStatus.SAVED
            };
            this.facade.saveSimulation(createData);
        }

        return new Observable(observer => {
            const checkInterval = setInterval(() => {
                if (!this.facade.saving()) {
                    clearInterval(checkInterval);
                    if (!this.facade.error()) {
                        observer.next({} as Simulation);
                        observer.complete();
                    } else {
                        observer.error(new Error(this.facade.error() || 'Error al guardar'));
                    }
                }
            }, 100);
        });
    }

    protected override onSubmitSuccess(): void {
        const currentSimulation = this.facade.currentSimulation();
        const message = currentSimulation?.id
            ? 'Simulación actualizada exitosamente'
            : 'Simulación guardada exitosamente';
        this.snackBar.open(message, 'Cerrar', { duration: 3000 });
    }

    protected override onSubmitError(error: any): void {
        this.snackBar.open(error.message || 'Error al guardar la simulación', 'Cerrar', { duration: 3000 });
    }

    onCalculate(): void {
        if (this.form.valid) {
            const data: CreateSimulationData = {
                ...this.getFormPayload(),
                status: SimulationStatus.DRAFT
            };
            this.facade.calculatePreview(data);
        } else {
            this.snackBar.open('Complete todos los campos requeridos', 'Cerrar', { duration: 3000 });
            this.form.markAllAsTouched();
        }
    }

    get amountToFinance(): number {
        const price = this.form.get('propertyPrice')?.value || 0;
        const down = this.form.get('downPayment')?.value || 0;
        const bonus = this.form.get('governmentBonusAmount')?.value || 0;
        return Math.max(0, price - down - bonus);
    }

    onToggleSchedule(): void {
        this.facade.toggleSchedule();
    }

    formatCurrency(value: number): string {
        return `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2 })}`;
    }

    private getFormPayload(): any {
        const { clientSearch, propertySearch, bankEntitySearch, ...payload } = this.form.value;
        return payload;
    }
}
