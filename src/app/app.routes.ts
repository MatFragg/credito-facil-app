import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

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
  {
    path: 'unauthorized',
    loadComponent: () => import('./features/layouts/pages/unauthorized-page/unauthorized-page.component').then(m => m.UnauthorizedPageComponent)
  },
  {
    path: '404',
    loadComponent: () => import('./features/layouts/pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'bank-entities',
    canActivate: [authGuard],
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/bank-entities/bank-entities.routes').then(m => m.BANK_ENTITIES_ROUTES)
  },
  {
    path: 'clients',
    canActivate: [authGuard],
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/clients/clients.routes').then(m => m.CLIENTS_ROUTES)
  },
  {
    path: 'settings',
    canActivate: [authGuard],
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/settings/settings.routes').then(m => m.SETTINGS_ROUTES)
  },
  {
    path: 'properties',
    canActivate: [authGuard],
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/properties/properties.routes').then(m => m.PROPERTIES_ROUTES)
  },
  {
    path: 'simulations',
    canActivate: [authGuard],
    loadComponent: () => import('./features/layouts/pages/app-layout/app-layout.component').then(m => m.AppLayoutComponent),
    loadChildren: () => import('./features/simulations/simulations.routes').then(m => m.SIMULATIONS_ROUTES)
  },
  {
    path: '**',
    loadComponent: () => import('./features/layouts/pages/not-found-page/not-found-page.component').then(m => m.NotFoundPageComponent)
  }
];