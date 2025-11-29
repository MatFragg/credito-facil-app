import { Component, computed, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../../../core/services/auth.service';
import { Role } from '../../../../core/models/role.enum';
import { HeaderConfig } from '../../../../shared/models/header-config.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatBadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() config!: HeaderConfig;

  protected authService = inject(AuthService);

  currentUser = computed(() => this.authService.currentUser());

  userRole = computed(() => {
    const user = this.currentUser();
    return user?.roles.includes(Role.ADMIN) ? 'Administrador' : 'Usuario';
  });

  onBackClick(): void {
    this.config.backButton?.action();
  }

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.config.search?.onSearch(value);
  }

  onNotificationClick(): void {
    this.config.onNotificationClick?.();
  }
}
