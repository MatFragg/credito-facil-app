import { Component, OnInit, inject } from '@angular/core';
import { StatsCardsComponent } from "../../../../../shared/components/stats-cards/stats-cards.component";
import { BankEntitiesListComponent } from "../../components/bank-entities-list/bank-entities-list.component";
import { LatestSimulationsListComponent } from "../../components/latest-simulations-list/latest-simulations-list.component";
import { QuickActionsComponent } from "../../components/quick-actions/quick-actions.component";
import { CurrentSettingsComponent } from "../../components/current-settings/current-settings.component";
import { DashboardFacade } from '../../state/dashboard.facade';

/**
 * Dashboard Page - Smart container component
 * Manages dashboard state via DashboardFacade and coordinates child components
 */
@Component({
  selector: 'app-dashboard-page',
  imports: [
    StatsCardsComponent,
    BankEntitiesListComponent,
    LatestSimulationsListComponent,
    QuickActionsComponent,
    CurrentSettingsComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  // Inject facade using inject() function (Angular 14+)
  protected readonly facade = inject(DashboardFacade);

  ngOnInit(): void {
    // Load all dashboard data on initialization
    this.facade.loadAll();
  }

  /**
   * Handles quick action clicks from child component
   */
  onActionClick(action: string): void {
    console.log('Quick action clicked:', action);
    // TODO: Navigate to appropriate page based on action
    // For now, just log the action
  }
}
