import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SideNavBarComponent } from '../../components/side-bar/side-nav-bar/side-nav-bar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from "@angular/material/sidenav";
import { HeaderConfig } from '../../../../shared/models/header-config.model';

@Component({
  selector: 'app-app-layout',
  imports: [SideNavBarComponent, RouterOutlet, HeaderComponent, MatSidenavContainer, MatSidenav, MatSidenavContent],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent implements OnInit {
  private router = inject(Router);

  headerConfig = signal<HeaderConfig>({
    title: 'Dashboard',
    subtitle: 'Bienvenido al sistema de créditos hipotecarios',
    showNotifications: true,
    notificationCount: 1,
    onNotificationClick: () => console.log('Notifications clicked')
  });

  ngOnInit(): void {
    // Update header configuration on route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateHeaderConfig();
    });

    // Initial configuration
    this.updateHeaderConfig();
  }

  private updateHeaderConfig(): void {
    const route = this.router.url;

    if (route.includes('/dashboard')) {
      this.headerConfig.set({
        title: 'Dashboard',
        subtitle: 'Bienvenido al sistema de créditos hipotecarios',
        showNotifications: true,
        notificationCount: 1,
        onNotificationClick: () => console.log('Notifications clicked')
      });
    } else if (route.includes('/bank-entities')) {
      this.headerConfig.set({
        title: 'Entidades Bancarias',
        subtitle: 'Gestión de tasas y requisitos por entidad financiera',
        actions: [{
          type: 'button',
          label: 'Actualizar Tasas',
          icon: 'refresh',
          color: 'primary',
          raised: true,
          handler: () => console.log('Update rates clicked')
        }]
      });
    } else if (route.includes('/properties')) {
      this.headerConfig.set({
        title: 'Catálogo de Viviendas',
        subtitle: 'Gestiona el inventario de propiedades disponibles',
        actions: [{
          type: 'button',
          label: 'Nueva Vivienda',
          icon: 'add',
          color: 'primary',
          raised: true,
          handler: () => this.router.navigate(['/properties/new'])
        }]
      });
    } else if (route.includes('/simulador/calculator')) {
      this.headerConfig.set({
        title: 'Simulador de Crédito',
        subtitle: 'Calcula tu crédito hipotecario con el método francés'
      });
    } else if (route.includes('/simulador')) {
      this.headerConfig.set({
        title: 'Historial de Simulaciones',
        subtitle: 'Gestiona y revisa todas las simulaciones realizadas',
        search: {
          placeholder: 'Buscar simulaciones...',
          value: '',
          onSearch: (query: string) => {
            // Search handled by simulations page component
          }
        },
        actions: [{
          type: 'button',
          label: 'Nueva Simulación',
          icon: 'add',
          color: 'primary',
          raised: true,
          handler: () => this.router.navigate(['/simulador/calculator'])
        }]
      });
    } else if (route === '/clients/new') {
      this.headerConfig.set({
        title: 'Agregar Cliente',
        subtitle: 'Registra un nuevo cliente en el sistema',
        backButton: {
          label: 'Volver',
          action: () => this.router.navigate(['/clients'])
        }
      });
    } else if (route.includes('/clients')) {
      this.headerConfig.set({
        title: 'Gestión de Clientes',
        subtitle: 'Administre la información de los clientes',
        search: {
          placeholder: 'Buscar cliente por DNI...',
          value: '',
          onSearch: (query: string) => {
            // The search will be handled by the clients page component
            // This is just for the header display
          }
        },
        actions: [{
          type: 'button',
          label: 'Nuevo Cliente',
          icon: 'add',
          color: 'primary',
          raised: true,
          handler: () => this.router.navigate(['/clients/new'])
        }]
      });
    } else if (route.includes('/settings')) {
      this.headerConfig.set({
        title: 'Configuración',
        subtitle: 'Administra las configuraciones del sistema'
      });
    } else {
      // Default header for other routes
      this.headerConfig.set({
        title: 'Crédito Fácil',
        subtitle: 'Sistema de créditos hipotecarios'
      });
    }
  }
}
