import { Routes } from '@angular/router';
import { DashboardPageComponent } from './presentation/pages/dashboard-page/dashboard-page.component';

// Domain layer imports
import { DashboardRepository } from './domain/repositories/dashboard.repository';
import { GetDashboardStatsUseCase } from './domain/usecases/get-dashboard-stats.usecase';
import { GetRecentActivityUseCase } from './domain/usecases/get-recent-activity.usecase';

// Data layer imports  
import { DashboardRepositoryImpl } from './data/repositories/dashboard.repository.impl';

// Presentation layer imports
import { DashboardFacade } from './presentation/state/dashboard.facade';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    providers: [
      // Provide repository implementation
      { provide: DashboardRepository, useClass: DashboardRepositoryImpl },

      // Provide use cases
      GetDashboardStatsUseCase,
      GetRecentActivityUseCase,

      // Provide facade (state management)
      DashboardFacade
    ]
  }
];