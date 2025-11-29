import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListCardConfig, ListItemConfig } from '../../models/list-card-config.model';

/**
 * Generic reusable list card component
 * Displays a card with a list of items, supporting various layouts and configurations
 */
@Component({
    selector: 'app-list-card',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.css']
})
export class ListCardComponent<T = any> {
    /** Card configuration */
    @Input() config!: ListCardConfig;

    /** Item layout configuration */
    @Input() itemConfig!: ListItemConfig<T>;

    /** Array of items to display */
    @Input() items: T[] = [];

    /** Loading state */
    @Input() isLoading: boolean = false;

    /**
     * Get items to display (respects maxItems limit)
     */
    get displayedItems(): T[] {
        if (this.config.maxItems && this.config.maxItems > 0) {
            return this.items.slice(0, this.config.maxItems);
        }
        return this.items;
    }

    /**
     * Handle item click
     */
    onItemClick(item: T): void {
        if (this.itemConfig.onClick) {
            this.itemConfig.onClick(item);
        }
    }

    /**
     * Get leading content for an item
     */
    getLeadingContent(item: T): string {
        return this.itemConfig.leading?.content(item) || '';
    }

    /**
     * Get leading CSS class for an item
     */
    getLeadingClass(item: T): string {
        return this.itemConfig.leading?.cssClass?.(item) || '';
    }

    /**
     * Get main title for an item
     */
    getMainTitle(item: T): string {
        return this.itemConfig.main.title(item);
    }

    /**
     * Get main subtitle for an item
     */
    getMainSubtitle(item: T): string | undefined {
        return this.itemConfig.main.subtitle?.(item);
    }

    /**
     * Get trailing content for an item
     */
    getTrailingContent(item: T): string {
        return this.itemConfig.trailing?.content(item) || '';
    }

    /**
     * Get trailing label for an item (used for price type)
     */
    getTrailingLabel(item: T): string | undefined {
        return this.itemConfig.trailing?.label?.(item);
    }

    /**
     * Get trailing CSS class for an item
     */
    getTrailingClass(item: T): string {
        return this.itemConfig.trailing?.cssClass?.(item) || '';
    }
}
