import { Component, input } from '@angular/core';
import { StatCardComponent } from './stat-card/stat-card.component';
import { StatCardData } from '../../../domain/models/dashboard.models';

@Component({
  selector: 'app-stats-cards',
  imports: [StatCardComponent],
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.css'
})
export class StatsCardsComponent {
  // Accept stats data from parent component
  stats = input<StatCardData[]>([]);
}
