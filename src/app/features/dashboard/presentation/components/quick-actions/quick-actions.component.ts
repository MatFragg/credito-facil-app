import { Component, output } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatCard } from "@angular/material/card";
import { QuickAction } from '../../../domain/models/dashboard.models';

@Component({
  selector: 'app-quick-actions',
  imports: [MatIcon, MatCard],
  templateUrl: './quick-actions.component.html',
  styleUrl: './quick-actions.component.css'
})
export class QuickActionsComponent {
  actionClicked = output<string>();

  actions: QuickAction[] = [
    { label: 'Nuevo Cliente', icon: 'person_add', action: 'new-client' },
    { label: 'Nueva Vivienda', icon: 'home', action: 'new-home' },
    { label: 'Nueva Simulación', icon: 'calculate', action: 'new-simulation' },
    { label: 'Generar Reporte', icon: 'description', action: 'generate-report' }
  ];

  onActionClick(action: string) {
    this.actionClicked.emit(action);
  }
}
