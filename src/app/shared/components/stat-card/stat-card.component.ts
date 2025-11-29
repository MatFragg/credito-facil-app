import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { NgClass } from '@angular/common';
import { StatCardData } from '../../models/stat-card.models';

@Component({
    selector: 'app-stat-card',
    standalone: true,
    imports: [MatCardModule, MatIcon, NgClass],
    template: `
    <mat-card class="stat-card">
      <div class="stat-content">
        <span class="stat-label">{{ data().label }}</span>
        <div class="stat-value">{{ data().value }}</div>
        <div class="stat-delta green-delta">
          {{ data().delta }} <span class="delta-text">{{ data().deltaText }}</span>
        </div>
      </div>
      <div class="stat-icon-container" [ngClass]="data().iconBgClass">
        <mat-icon>{{ data().iconName }}</mat-icon>
      </div>
    </mat-card>
  `,
    styleUrl: './stat-card.component.css'
})
export class StatCardComponent {
    data = input.required<StatCardData>();
}
