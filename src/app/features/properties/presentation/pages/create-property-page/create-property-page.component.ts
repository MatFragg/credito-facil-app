import { Component, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PropertiesFacade } from '../../state/properties.facade';
import { getPropertyTypeOptions, PropertyType } from '../../../domain/models/property-type.enum';
import { getPropertyStatusOptions, PropertyStatus } from '../../../domain/models/property-status.enum';
import { CreatePropertyData, Property } from '../../../domain/models/property.model';
import { BaseFormComponent } from '../../../../../shared/components/base-form/base-form.component';
import { ClientsFacade } from '../../../../clients/presentation/state/clients.facade';
import { Client, ClientHelpers } from '../../../../clients/domain/models/client.model';
import { ClientRepository } from '../../../../clients/domain/repositories/client.repository';
import { ClientRepositoryImpl } from '../../../../clients/data/repositories/client.repository.impl';
import { GetClientsUseCase } from '../../../../clients/domain/usecases/get-clients.usecase';
import { GetClientByIdUseCase } from '../../../../clients/domain/usecases/get-client-by-id.usecase';
import { SearchClientByDniUseCase } from '../../../../clients/domain/usecases/search-client-by-dni.usecase';
import { CreateClientUseCase } from '../../../../clients/domain/usecases/create-client.usecase';
import { UpdateClientUseCase } from '../../../../clients/domain/usecases/update-client.usecase';
import { DeleteClientUseCase } from '../../../../clients/domain/usecases/delete-client.usecase';

@Component({
    selector: 'app-create-property-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatSnackBarModule,
        MatAutocompleteModule
    ],
    providers: [
        { provide: ClientRepository, useClass: ClientRepositoryImpl },
        GetClientsUseCase,
        GetClientByIdUseCase,
        SearchClientByDniUseCase,
        CreateClientUseCase,
        UpdateClientUseCase,
        DeleteClientUseCase,
        ClientsFacade
    ],
    templateUrl: './create-property-page.component.html',
    styleUrls: ['./create-property-page.component.css']
})
export class CreatePropertyPageComponent extends BaseFormComponent implements OnInit {
    propertyTypes = getPropertyTypeOptions();
    propertyStatuses = getPropertyStatusOptions();

    // Image preview
    imagePreview: string | null = null;
    selectedImage: File | null = null;

    // Client autocomplete
    allClients: Client[] = [];
    filteredClients$!: Observable<Client[]>;
    selectedClient: Client | null = null;

    // Dropdown options for bedrooms/bathrooms/parking
    bedroomOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    bathroomOptions = [0, 1, 2, 3, 4, 5, 6];
    parkingOptions = [0, 1, 2, 3, 4, 5];

    constructor(
        private fb: FormBuilder,
        public facade: PropertiesFacade,
        public clientsFacade: ClientsFacade,
        private router: Router,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        super();

        // Use effect to reactively update allClients when signal changes
        effect(() => {
            this.allClients = this.clientsFacade.clients();
        });
    }

    override ngOnInit(): void {
        super.ngOnInit();
        // Load all clients for autocomplete
        this.clientsFacade.loadAll(0, 1000);
    }

    override buildForm(): void {
        this.form = this.fb.group({
            clientId: [null, [Validators.required, Validators.min(1)]],
            clientSearch: [''], // For autocomplete display
            propertyName: [''],
            projectName: ['', [Validators.maxLength(200)]],
            propertyType: [PropertyType.HOUSE, Validators.required],
            price: [null, [Validators.required, Validators.min(0.01)]],
            area: [null, [Validators.min(0.01)]],
            bedrooms: [0, [Validators.min(0)]],
            bathrooms: [0, [Validators.min(0)]],
            parkingSpaces: [0, [Validators.min(0)]],
            ageYears: [0, [Validators.min(0)]],
            address: ['', [Validators.maxLength(200)]],
            district: ['', [Validators.maxLength(100)]],
            province: ['Lima', [Validators.maxLength(100)]],
            city: ['Lima', [Validators.maxLength(100)]],
            status: [PropertyStatus.AVAILABLE],
            description: ['']
        });

        // Setup client autocomplete filtering
        this.filteredClients$ = this.form.get('clientSearch')!.valueChanges.pipe(
            startWith(''),
            map(value => this._filterClients(value || ''))
        );
    }


    private _filterClients(value: string | Client): Client[] {
        // If value is an object (selected client), return all clients
        if (typeof value === 'object' && value !== null) {
            return this.allClients;
        }
        const filterValue = (value || '').toLowerCase();
        return this.allClients.filter(client =>
            ClientHelpers.getFullName(client).toLowerCase().includes(filterValue) ||
            (client.dni && client.dni.includes(filterValue))
        );
    }

    displayClient(client: Client | null): string {
        if (!client) return '';
        const name = ClientHelpers.getFullName(client);
        const dni = client.dni ? ` (DNI: ${client.dni})` : '';
        return `${name}${dni}`;
    }

    onClientSelected(client: Client): void {
        this.selectedClient = client;
        this.form.patchValue({ clientId: client.id });
    }

    override submitForm(): Observable<Property> {
        const formValue = this.form.value;

        const propertyData: CreatePropertyData = {
            ...formValue,
            image: this.selectedImage || undefined
        };

        // Call facade and return observable
        this.facade.createProperty(propertyData);

        // Return a simple observable that completes when facade finishes
        return new Observable(observer => {
            const checkInterval = setInterval(() => {
                if (!this.facade.saving()) {
                    clearInterval(checkInterval);
                    if (!this.facade.error()) {
                        observer.next({} as Property); // Success
                        observer.complete();
                    } else {
                        observer.error(new Error(this.facade.error() || 'Error al guardar'));
                    }
                }
            }, 100);
        });
    }

    protected override onSubmitSuccess(): void {
        this.snackBar.open('Propiedad registrada exitosamente', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/properties']);
    }

    protected override onSubmitError(error: any): void {
        this.snackBar.open(error.message || 'Error al guardar la propiedad', 'Cerrar', { duration: 3000 });
    }

    onImageSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];

            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                this.snackBar.open('Solo se permiten imágenes JPEG, PNG y WebP', 'Cerrar', { duration: 3000 });
                return;
            }

            // Validate file size (max 5MB)
            const maxSize = 5 * 1024 * 1024;
            if (file.size > maxSize) {
                this.snackBar.open('El tamaño de la imagen no puede exceder 5MB', 'Cerrar', { duration: 3000 });
                return;
            }

            this.selectedImage = file;

            // Create preview
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(file);
        }
    }

    removeImage(): void {
        this.selectedImage = null;
        this.imagePreview = null;
    }

    triggerFileInput(): void {
        document.getElementById('imageInput')?.click();
    }

    onCancel(): void {
        this.router.navigate(['/properties']);
    }
}
