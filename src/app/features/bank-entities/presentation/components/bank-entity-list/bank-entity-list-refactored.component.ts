import { Component, EventEmitter, inject, Input, Output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { AuthService } from '../../../../../core/services/auth.service';
import { Role } from '../../../../../core/models/role.enum';
import { BankEntity } from '../../../domain/models/bank-entity.model';
import { DataTableComponent } from '../../../../../shared/components/data-table/data-table.component';
import { TableColumn, TableAction } from '../../../../../shared/models/table-column.model';
import { DataTableConfig } from '../../../../../shared/models/table-config.model';

/**
 * Bank Entity List Component - Refactored to use shared DataTableComponent
 * Displays all bank entities with role-based access control for admin actions
 */
@Component({
    selector: 'app-bank-entity-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCard,
        DataTableComponent
    ],
    templateUrl: './bank-entity-list-refactored.component.html',
    styleUrls: ['./bank-entity-list.component.css']
})
export class BankEntityListRefactoredComponent {
    @Input() entities: BankEntity[] = [];
    @Input() isLoading: boolean = false;
    @Output() edit = new EventEmitter<BankEntity>();
    @Output() view = new EventEmitter<BankEntity>();

    protected authService = inject(AuthService);

    isAdmin = computed(() => {
        const user = this.authService.currentUser();
        return user?.roles.includes(Role.ADMIN) ?? false;
    });

    // Table columns configuration
    columns: TableColumn<BankEntity>[] = [
        {
            key: 'name',
            label: 'Entidad',
            type: 'custom',
            cellTemplate: (entity: BankEntity) => `
        <div class="entity-info">
          <div class="entity-badge ${this.getBankBadgeClass(entity.name)}">
            ${this.getBankInitials(entity.name)}
          </div>
          <div class="entity-details">
            <div class="entity-name">${entity.name}</div>
            <div class="entity-subtitle">${this.getBankSubtitle(entity.name)}</div>
          </div>
        </div>
      `,
            width: '30%'
        },
        {
            key: 'currentRate',
            label: 'Tasa Actual',
            type: 'badge',
            badgeClass: (entity: BankEntity) => {
                if (entity.currentRate < 8) return 'rate-badge rate-low';
                if (entity.currentRate >= 8 && entity.currentRate < 9) return 'rate-badge rate-medium';
                return 'rate-badge rate-high';
            },
            cellTemplate: (entity: BankEntity) => `${entity.currentRate.toFixed(2)}%`,
            width: '15%'
        },
        {
            key: 'minimunIncome',
            label: 'Ingreso Mínimo',
            type: 'currency',
            currencySymbol: 'S/',
            width: '20%'
        },
        {
            key: 'maxCoveragePct',
            label: 'Cuota Inicial',
            type: 'percentage',
            decimals: 0,
            width: '15%'
        },
        {
            key: 'lastUpdate',
            label: 'Última Actualización',
            type: 'text',
            cellTemplate: () => '15/10/2024', // Static for now, replace with actual date field
            width: '20%'
        }
    ];

    // Table actions configuration
    actions: TableAction<BankEntity>[] = [
        {
            id: 'edit',
            icon: 'edit',
            tooltip: 'Editar',
            color: 'primary',
            visible: () => this.isAdmin(),
            handler: (entity: BankEntity) => this.edit.emit(entity)
        },
        {
            id: 'view',
            icon: 'visibility',
            tooltip: 'Ver detalles',
            handler: (entity: BankEntity) => this.view.emit(entity)
        },
        {
            id: 'compare',
            icon: 'compare_arrows',
            tooltip: 'Comparar',
            handler: (entity: BankEntity) => {
                console.log('Compare:', entity);
            }
        }
    ];

    // Table configuration
    tableConfig: DataTableConfig<BankEntity> = {
        pagination: {
            enabled: true,
            pageSize: 5,
            pageSizeOptions: [5, 10, 25],
            showFirstLastButtons: true
        },
        hoverableRows: true,
        clickableRows: false,
        loadingMessage: 'Cargando entidades bancarias...',
        emptyMessage: 'No se encontraron entidades bancarias',
        tableClass: 'bank-entities-table'
    };

    // Helper methods for bank styling
    getBankInitials(name: string): string {
        const bankInitials: { [key: string]: string } = {
            'Banco de Crédito del Perú': 'BCP',
            'BBVA Perú': 'BBVA',
            'Scotiabank Perú': 'SCT',
            'Interbank': 'INT',
            'Banco Pichincha': 'PIC'
        };
        return bankInitials[name] || name.substring(0, 3).toUpperCase();
    }

    getBankSubtitle(name: string): string {
        const bankSubtitles: { [key: string]: string } = {
            'Banco de Crédito del Perú': 'BCP',
            'BBVA Perú': 'BBVA',
            'Scotiabank Perú': 'Scotia',
            'Interbank': 'IBK',
            'Banco Pichincha': 'Pichincha'
        };
        return bankSubtitles[name] || name;
    }

    getBankBadgeClass(name: string): string {
        const badgeClasses: { [key: string]: string } = {
            'Banco de Crédito del Perú': 'badge-bcp',
            'BBVA Perú': 'badge-bbva',
            'Scotiabank Perú': 'badge-scotiabank',
            'Interbank': 'badge-interbank',
            'Banco Pichincha': 'badge-pichincha'
        };
        return badgeClasses[name] || 'badge-default';
    }
}
