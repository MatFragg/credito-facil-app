import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { PropertiesFacade } from '../../state/properties.facade';
import { Property } from '../../../domain/models/property.model';
import { PropertyHelpers } from '../../../domain/models/property.model';

@Component({
    selector: 'app-property-details-page',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatCardModule
    ],
    templateUrl: './property-details-page.component.html',
    styleUrls: ['./property-details-page.component.css']
})
export class PropertyDetailsPageComponent implements OnInit {
    propertyId = signal<number | null>(null);
    property = signal<Property | null>(null);
    loading = signal<boolean>(false);
    error = signal<string | null>(null);

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public facade: PropertiesFacade
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            if (id && !isNaN(id)) {
                this.propertyId.set(id);
                this.loadProperty(id);
            } else {
                this.error.set('ID de propiedad inválido');
            }
        });
    }

    loadProperty(id: number): void {
        this.loading.set(true);
        this.error.set(null);

        // Load all properties and find the one we need
        // This uses the existing GetPropertiesUseCase
        this.facade.loadProperties(0, 100);

        // Wait for properties to load and find the one we need
        setTimeout(() => {
            const properties = this.facade.properties();
            if (properties) {
                const foundProperty = properties.content.find(p => p.id === id);
                if (foundProperty) {
                    this.property.set(foundProperty);
                } else {
                    this.error.set('Propiedad no encontrada');
                }
            }
            this.loading.set(false);
        }, 500);
    }

    goBack(): void {
        this.router.navigate(['/properties']);
    }

    createSimulation(): void {
        const prop = this.property();
        if (prop) {
            this.router.navigate(['/simulations/calculator'], {
                queryParams: { propertyId: prop.id }
            });
        }
    }

    editProperty(): void {
        // TODO: Implement edit functionality
        console.log('Edit property:', this.property());
    }

    deleteProperty(): void {
        const prop = this.property();
        if (prop && confirm(`¿Estás seguro de eliminar la propiedad "${prop.propertyName || prop.projectName}"?`)) {
            this.facade.deleteProperty(prop.id);
            this.router.navigate(['/properties']);
        }
    }

    getFullAddress(): string {
        const prop = this.property();
        return prop ? PropertyHelpers.getFullAddress(prop) : '';
    }

    formatPrice(): string {
        const prop = this.property();
        return prop ? PropertyHelpers.formatPrice(prop.price) : '';
    }

    getSummary(): string {
        const prop = this.property();
        return prop ? PropertyHelpers.getSummary(prop) : '';
    }

    getStatusLabel(): string {
        const prop = this.property();
        if (!prop) return '';

        switch (prop.status) {
            case 'AVAILABLE': return 'Disponible';
            case 'SOLD': return 'Vendido';
            case 'RESERVED': return 'Reservado';
            default: return prop.status;
        }
    }

    getStatusColor(): string {
        const prop = this.property();
        if (!prop) return 'default';

        switch (prop.status) {
            case 'AVAILABLE': return 'primary';
            case 'SOLD': return 'warn';
            case 'RESERVED': return 'accent';
            default: return 'default';
        }
    }

    getPropertyTypeLabel(): string {
        const prop = this.property();
        if (!prop) return '';

        switch (prop.propertyType) {
            case 'HOUSE': return 'Casa';
            case 'APARTMENT': return 'Departamento';
            case 'DUPLEX': return 'Dúplex';
            default: return prop.propertyType;
        }
    }
}
