import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ListCardComponent } from '../../../../../shared/components/list-card/list-card.component';
import { ListCardConfig, ListItemConfig } from '../../../../../shared/models/list-card-config.model';

interface SimulationItem {
  name: string;
  detail: string;
  monthlyPayment: number;
}

@Component({
  selector: 'app-latest-simulations-list',
  standalone: true,
  imports: [ListCardComponent],
  template: `
    <app-list-card
      [config]="listConfig"
      [itemConfig]="itemConfig"
      [items]="simulations">
    </app-list-card>
  `
})
export class LatestSimulationsListComponent {
  private router = inject(Router);

  simulations: SimulationItem[] = [
    {
      name: 'María González',
      detail: 'Casa en Los Olivos - S/ 320,000',
      monthlyPayment: 1890,
    },
    {
      name: 'Carlos Mendoza',
      detail: 'Depto en San Miguel - S/ 280,000',
      monthlyPayment: 1650,
    },
    {
      name: 'Ana Torres',
      detail: 'Casa en Surco - S/ 450,000',
      monthlyPayment: 2340,
    }
  ];

  listConfig: ListCardConfig = {
    title: 'Simulaciones Recientes',
    footerButton: {
      label: 'Ver Todas las Simulaciones',
      action: () => this.router.navigate(['/simulations'])
    },
    maxItems: 3,
    showDividers: true
  };

  itemConfig: ListItemConfig<SimulationItem> = {
    leading: {
      type: 'icon',
      content: (item) => 'person'
    },
    main: {
      title: (item) => item.name,
      subtitle: (item) => item.detail
    },
    trailing: {
      type: 'price',
      content: (item) => `S/ ${item.monthlyPayment.toLocaleString()}`,
      label: () => 'cuota mensual'
    }
  };
}
