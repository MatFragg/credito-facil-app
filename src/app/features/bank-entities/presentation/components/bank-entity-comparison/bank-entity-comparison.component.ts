import { Component, OnInit, signal, effect, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BankEntity } from '../../../domain/models/bank-entity.model';
import { BankEntitiesFacade } from '../../state/bank-entities.facade';

@Component({
  selector: 'app-bank-entity-comparison',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-entity-comparison.component.html',
  styleUrls: ['./bank-entity-comparison.component.css']
})
export class BankEntityComparisonComponent implements OnInit {
  // Input from parent (page component)
  @Input() availableEntities: BankEntity[] = [];
  comparisonEntities = signal<BankEntity[]>([]);

  // Selected entities
  selectedEntity1: BankEntity | null = null;
  selectedEntity2: BankEntity | null = null;
  selectedEntity3: BankEntity | null = null;

  private facade = inject(BankEntitiesFacade);

  constructor() {
    // Effect must be called in constructor or class field initializer
    effect(() => {
      const results = this.facade.comparisonEntities();
      this.comparisonEntities.set(results);
    });
  }

  ngOnInit(): void {
    // Initialization logic can go here if needed
  }

  onSelectionChange(): void {
    const ids: number[] = [];
    if (this.selectedEntity1) ids.push(this.selectedEntity1.id);
    if (this.selectedEntity2) ids.push(this.selectedEntity2.id);
    if (this.selectedEntity3) ids.push(this.selectedEntity3.id);

    // TODO: Call facade to compare
    this.facade.compareEntities(ids);
    console.log('Selected entities:', ids);
  }

  hasSelection(): boolean {
    return this.selectedEntity1 !== null ||
      this.selectedEntity2 !== null ||
      this.selectedEntity3 !== null;
  }

  getSelectedCount(): number {
    let count = 0;
    if (this.selectedEntity1) count++;
    if (this.selectedEntity2) count++;
    if (this.selectedEntity3) count++;
    return count;
  }
}
