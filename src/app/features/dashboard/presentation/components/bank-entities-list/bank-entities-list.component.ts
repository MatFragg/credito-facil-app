import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ListCardComponent } from '../../../../../shared/components/list-card/list-card.component';
import { ListCardConfig, ListItemConfig } from '../../../../../shared/models/list-card-config.model';

interface BankEntityItem {
  name: string;
  detail: string;
  rate: number;
}

@Component({
  selector: 'app-bank-entities-list',
  standalone: true,
  imports: [ListCardComponent],
  template: `
    <app-list-card
      [config]="listConfig"
      [itemConfig]="itemConfig"
      [items]="bankEntities">
    </app-list-card>
  `
})
export class BankEntitiesListComponent {
  private router = inject(Router);

  bankEntities: BankEntityItem[] = [
    { name: 'BCP', detail: 'Tasa vigente', rate: 8.5 },
    { name: 'BBVA', detail: 'Tasa vigente', rate: 8.7 },
    { name: 'Scotiabank', detail: 'Tasa vigente', rate: 9.1 },
    { name: 'Interbank', detail: 'Tasa vigente', rate: 8.9 }
  ];

  listConfig: ListCardConfig = {
    title: 'Entidades Bancarias',
    footerButton: {
      label: 'Ver Todas las Entidades',
      icon: 'account_balance',
      action: () => this.router.navigate(['/bank-entities'])
    },
    showDividers: true
  };

  itemConfig: ListItemConfig<BankEntityItem> = {
    leading: {
      type: 'none',
      content: () => ''
    },
    main: {
      title: (item) => item.name,
      subtitle: (item) => item.detail
    },
    trailing: {
      type: 'badge',
      content: (item) => `${item.rate}%`,
      cssClass: (item) => item.rate < 9 ? 'badge-green' : 'badge-yellow'
    }
  };
}
