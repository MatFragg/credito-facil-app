import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./features/layouts/pages/index-layout/index-layout.component').then(m => m.IndexLayoutComponent),
    children: [
      {
        path: '',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
      }
    ]
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'bank-entities',
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/bank-entities/bank-entities.routes').then(m => m.BANK_ENTITIES_ROUTES)
  },
  {
    path: 'clients',
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/clients/clients.routes').then(m => m.CLIENTS_ROUTES)
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/settings/settings.routes').then(m => m.SETTINGS_ROUTES)
  },
  {
    path: 'properties',
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/properties/properties.routes').then(m => m.PROPERTIES_ROUTES)
  },
  {
    path: 'simulations',
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/simulations/simulations.routes').then(m => m.SIMULATIONS_ROUTES)
  },
];