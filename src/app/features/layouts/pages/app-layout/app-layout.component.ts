
import { Component, OnInit, OnDestroy, inject, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Subject, filter } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatDrawerMode, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SideNavBarComponent } from '../../components/side-bar/side-nav-bar/side-nav-bar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HeaderConfig } from '../../../../shared/models/header-config.model';

@Component({
  selector: 'app-app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    SideNavBarComponent
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private breakpoint = inject(BreakpointObserver);
  private destroy$ = new Subject<void>();

  @ViewChild('sidenav') sidenav!: MatSidenav;

  sidenavMode: MatDrawerMode = 'side';
  sidenavOpened = true;

  headerConfig = signal<HeaderConfig>({
    title: 'Dashboard',
    subtitle: 'Bienvenido al sistema de créditos hipotecarios',
    showNotifications: true,
    notificationCount: 1,
    onNotificationClick: () => console.log('Notifications clicked')
  });

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      takeUntil(this.destroy$)
    ).subscribe(() => this.updateHeaderConfig());
    this.updateHeaderConfig();

    this.breakpoint.observe(['(max-width: 991px)'])
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        const isMobile = state.matches;
        this.sidenavMode = isMobile ? 'over' : 'side';
        this.sidenavOpened = !isMobile;
        if (isMobile && this.sidenav) this.sidenav.close();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openSidenav(): void {
    if (this.sidenavMode === 'over' && this.sidenav) {
      this.sidenav.open();
    }
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
          onSearch: (_q: string) => {}
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
          onSearch: (_q: string) => {}
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
      this.headerConfig.set({
        title: 'Crédito Fácil',
        subtitle: 'Sistema de créditos hipotecarios'
      });
    }
  }
}
