import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchItemComponent } from '../search-item/search-item.component';
import { SearchItemData } from '../../../../types/interfaces';
import { SearchService } from '../../../services/search.service';
import { FilterPipe } from '../../../pipes/filter.pipe';

import { SortType } from '../../../../types/enums';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchItemComponent, FilterPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  public items = signal<SearchItemData[]>([]);
  public filteredItems = signal<SearchItemData[]>([]);
  public showResults = signal(false);

  private sortConfig = signal({ criteria: SortType.DATE, direction: SortType.ASC });

  public filterTerm = signal('');

  private readonly searchService = inject(SearchService);

  ngOnInit(): void {
    this.searchService.items$.subscribe((items) => {
      if (items.length > 0) {
        this.items.set(items);
        this.applyFilters();
        this.showResults.set(true);
      } else {
        this.filteredItems.set([]);
        this.showResults.set(false);
      }
    });

    this.searchService.sortConfig$.subscribe((config) => {
      this.sortConfig.set(config);
      this.applyFilters();
    });

    this.searchService.filterTerm$.subscribe((term) => {
      this.filterTerm.set(term);
      this.applyFilters();
    });
  }

  private sortItems() {
    const { criteria, direction } = this.sortConfig();

    this.filteredItems().sort((a, b) => {
      const valueA =
        criteria === SortType.DATE ? new Date(a.snippet.publishedAt).getTime() : parseInt(a.statistics.viewCount, 10);
      const valueB =
        criteria === SortType.DATE ? new Date(b.snippet.publishedAt).getTime() : parseInt(b.statistics.viewCount, 10);

      return direction === SortType.ASC ? valueA - valueB : valueB - valueA;
    });
  }

  private applyFilters() {
    const filterTerm = this.filterTerm().toLowerCase();

    this.filteredItems.set(
      this.items().filter(
        (item) =>
          item.snippet.description.toLowerCase().includes(filterTerm) ||
          item.snippet.title.toLowerCase().includes(filterTerm),
      ),
    );
    this.sortItems();
  }
}
