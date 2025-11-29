import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BankEntitiesFacade } from '../../state/bank-entities.facade';
import { BankEntityListComponent } from '../../components/bank-entity-list/bank-entity-list.component';
import { BankEntityComparisonComponent } from '../../components/bank-entity-comparison/bank-entity-comparison.component';
import { BankEntityFormComponent } from '../../components/bank-entity-form/bank-entity-form.component';
import { FilterBarComponent } from '../../../../../shared/components/filter-bar/filter-bar.component';
import { FilterBarConfig, FilterValues } from '../../../../../shared/models/filter-field.model';
import { BankEntity } from '../../../domain/models/bank-entity.model';

/**
 * 🎯 Part of LEARNING CHALLENGE #4: Search & Filter with URL Params
 *
 * Bank Entities Page Component
 * Main container for the bank entities feature
 */
@Component({
  selector: 'app-bank-entities-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    BankEntityListComponent,
    BankEntityComparisonComponent,
    BankEntityFormComponent,
    FilterBarComponent
  ],
  templateUrl: './bank-entities-page.component.html',
  styleUrls: ['./bank-entities-page.component.css']
})
export class BankEntitiesPageComponent implements OnInit, OnDestroy {
  searchQuery: string = '';

  // Modal state
  isModalOpen = signal(false);
  selectedEntity = signal<BankEntity | null>(null);

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  // Filter Bar Configuration
  filterConfig: FilterBarConfig = {
    title: 'Filtros y Búsqueda',
    showClearButton: true,
    clearButtonText: 'Limpiar Filtros',
    layoutMode: 'horizontal',
    containerStyle: 'card',
    applyMode: 'auto',
    fields: [
      {
        id: 'searchQuery',
        type: 'text',
        label: 'Buscar Entidad',
        placeholder: 'Nombre de la entidad...',
        icon: 'search'
      },
      {
        id: 'rateRange',
        type: 'select',
        label: 'Rango de Tasa',
        placeholder: 'Todas las tasas',
        options: [
          { value: '', label: 'Todas las tasas' },
          { value: 'low', label: 'Menor a 8%' },
          { value: 'medium', label: '8% - 9%' },
          { value: 'high', label: 'Mayor a 9%' }
        ]
      },
      {
        id: 'incomeRange',
        type: 'select',
        label: 'Ingreso Mínimo',
        placeholder: 'Todos los ingresos',
        options: [
          { value: '', label: 'Todos los ingresos' },
          { value: 'low', label: 'Hasta S/ 3,000' },
          { value: 'medium', label: 'S/ 3,000 - S/ 5,000' },
          { value: 'high', label: 'Más de S/ 5,000' }
        ]
      },
      {
        id: 'initialPayment',
        type: 'select',
        label: 'Cuota Inicial',
        placeholder: 'Todas las cuotas',
        options: [
          { value: '', label: 'Todas las cuotas' },
          { value: '15', label: '15%' },
          { value: '20', label: '20%' },
          { value: '25', label: '25%' }
        ]
      }
    ]
  };

  constructor(
    public facade: BankEntitiesFacade,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Load all bank entities on init
    this.facade.loadAll();

    // Setup debounced search
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(query => {
      // Update URL query params
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { name: query || null },
        queryParamsHandling: 'merge'
      });

      // Perform search
      if (query) {
        this.facade.search(query);
      } else {
        this.facade.loadAll();
      }
    });

    // Read query params on load
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      const nameParam = params['name'];
      if (nameParam) {
        this.searchQuery = nameParam;
        this.facade.search(nameParam);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  onFilterChange(filters: FilterValues): void {
    // Handle search query
    const query = filters['searchQuery'] || '';
    if (query) {
      this.searchQuery = query;
      this.searchSubject.next(query);
    } else if (this.searchQuery) {
      this.searchQuery = '';
      this.facade.loadAll();
    }

    // TODO: Implement other filter logic (rate range, income, initial payment)
    console.log('Bank entities filters changed:', filters);
  }

  onClearFilters(): void {
    this.searchQuery = '';
    this.facade.loadAll();
  }

  onEditEntity(entity: BankEntity): void {
    console.log('Edit entity:', entity);
    this.selectedEntity.set(entity);
    this.isModalOpen.set(true);
  }

  onViewEntity(entity: BankEntity): void {
    console.log('View entity:', entity);
    // TODO: Show entity details
  }

  getLowestRate(): number {
    const entities = this.facade.entities();
    if (entities.length === 0) return 0;
    return Math.min(...entities.map(e => e.currentRate));
  }

  onModalSaved(data: any): void {
    console.log('Modal saved:', data);
    this.isModalOpen.set(false);
    this.selectedEntity.set(null);
    // Reload entities to show updated data
    this.facade.loadAll();
  }

  onModalCancelled(): void {
    console.log('Modal cancelled');
    this.isModalOpen.set(false);
    this.selectedEntity.set(null);
  }
}
