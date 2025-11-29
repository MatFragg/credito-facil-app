import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Property, PropertyHelpers } from '../../../domain/models/property.model';
import { PropertyStatusLabels, PropertyStatusColors } from '../../../domain/models/property-status.enum';

@Component({
    selector: 'app-property-card',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    templateUrl: './property-card.component.html',
    styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {
    @Input() property!: Property;
    @Output() viewDetails = new EventEmitter<Property>();
    @Output() edit = new EventEmitter<Property>();
    @Output() delete = new EventEmitter<Property>();

    readonly PropertyHelpers = PropertyHelpers;
    readonly PropertyStatusLabels = PropertyStatusLabels;
    readonly PropertyStatusColors = PropertyStatusColors;

    onViewDetails(): void {
        this.viewDetails.emit(this.property);
    }

    onEdit(): void {
        this.edit.emit(this.property);
    }

    onDelete(): void {
        if (confirm(`¿Está seguro de eliminar la propiedad "${this.property.propertyName || this.property.propertyCode}"?`)) {
            this.delete.emit(this.property);
        }
    }

    get defaultImage(): string {
        return 'https://via.placeholder.com/400x300/e0e0e0/666?text=Sin+Imagen';
    }
}
