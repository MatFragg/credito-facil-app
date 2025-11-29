import { Component, EventEmitter, inject, Input, OnInit, Output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BankEntity } from '../../../domain/models/bank-entity.model';
import { AuthService } from '../../../../../core/services/auth.service';
import { Role } from '../../../../../core/models/role.enum';
import { ViewEncapsulation } from '@angular/core';

/**
 * ✅ CHALLENGE #1 SOLUTION: Admin Role Protection
 *
 * Bank Entity List Component with role-based access control
 * Displays all bank entities in Angular Material table format with pagination
 */
@Component({
  selector: 'app-bank-entity-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './bank-entity-list.component.html',
  styleUrls: ['./bank-entity-list.component.css'],
  encapsulation: ViewEncapsulation.None // Allows custom styles to override Material defaults
})
export class BankEntityListComponent implements OnInit {
  @Input() entities: BankEntity[] = [];
  @Input() isLoading: boolean = false;
  @Output() edit = new EventEmitter<BankEntity>();
  @Output() view = new EventEmitter<BankEntity>();

  displayedColumns: string[] = ['entity', 'currentRate', 'minimumIncome', 'initialFee', 'lastUpdate', 'actions'];

  // Pagination
  pageSize = signal(5);
  pageIndex = signal(0);

  // Paginated entities
  pageEntities = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.entities.slice(start, end);
  });

  // ✅ CHALLENGE #1 SOLUTION: Inject AuthService and create isAdmin computed signal
  protected authService = inject(AuthService);

  isAdmin = computed(() => {
    const user = this.authService.currentUser();
    return user?.roles.includes(Role.ADMIN) ?? false;
  });

  ngOnInit(): void {
    console.log('Current user:', this.authService.currentUser());
    console.log('Is admin:', this.isAdmin());
    console.log('Total entities:', this.entities.length);
  }

  onEdit(entity: BankEntity): void {
    this.edit.emit(entity);
  }

  onView(entity: BankEntity): void {
    this.view.emit(entity);
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  getTotalEntities(): number {
    return this.entities.length;
  }

  getStartIndex(): number {
    return this.pageIndex() * this.pageSize();
  }

  getEndIndex(): number {
    return Math.min(this.getStartIndex() + this.pageSize(), this.getTotalEntities());
  }

  // Helper methods for bank styling
  getBankInitials(name: string): string {
    const bankInitials: { [key: string]: string } = {
      'Banco de Crédito del Perú': 'BCP',
      'BBVA Perú': 'BBVA',
      'Scotiabank Perú': 'SCT',
      'Interbank': 'INT',
      'Banco Pichincha': 'PIC'
    };
    return bankInitials[name] || name.substring(0, 3).toUpperCase();
  }

  getBankSubtitle(name: string): string {
    const bankSubtitles: { [key: string]: string } = {
      'Banco de Crédito del Perú': 'BCP',
      'BBVA Perú': 'BBVA',
      'Scotiabank Perú': 'Scotia',
      'Interbank': 'IBK',
      'Banco Pichincha': 'Pichincha'
    };
    return bankSubtitles[name] || name;
  }

  getBankBadgeClass(name: string): string {
    const badgeClasses: { [key: string]: string } = {
      'Banco de Crédito del Perú': 'badge-bcp',
      'BBVA Perú': 'badge-bbva',
      'Scotiabank Perú': 'badge-scotiabank',
      'Interbank': 'badge-interbank',
      'Banco Pichincha': 'badge-pichincha'
    };
    return badgeClasses[name] || 'badge-default';
  }

  getColorForBank(name: string): string {
    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
    const index = name.length % colors.length;
    return colors[index];
  }
}
