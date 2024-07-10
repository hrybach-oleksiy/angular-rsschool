import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subscription } from 'rxjs';
import { SearchItemComponent } from '../search-item/search-item.component';
import { SearchItemData, SearchResultsData } from '../../types/interfaces';
import { SearchService } from '../../services/search.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchItemComponent, FilterPipe],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public items: SearchItemData[] = [];
  public filteredItems: SearchItemData[] = [];
  public showResults: boolean = false;
  public searchTerm: string = '';
  private sortConfig = { criteria: 'date', direction: 'asc' };
  public filterTerm: string = '';

  private searchSubscription!: Subscription;
  private sortSubscription!: Subscription;
  private filterSubscription!: Subscription;

  constructor(
    private http: HttpClient,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.http.get<SearchResultsData>('api/response.json').subscribe((data) => {
      this.items = data.items;
      this.applyFilters();
    });

    this.searchSubscription = this.searchService.searchQuery$.subscribe((query) => {
      if (query) {
        this.searchTerm = query;
        this.applyFilters();
        this.showResults = true;
      } else {
        this.filteredItems = [];
        this.showResults = false;
      }
    });

    this.sortSubscription = this.searchService.sortConfig$.subscribe((config) => {
      this.sortConfig = config;
      this.applyFilters();
    });

    this.filterSubscription = this.searchService.filterTerm$.subscribe((term) => {
      this.filterTerm = term;
      this.applyFilters();
    });
  }

  ngOnDestroy(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }

    if (this.filterSubscription) {
      this.filterSubscription?.unsubscribe();
    }
  }

  private sortItems() {
    const { criteria, direction } = this.sortConfig;
    this.filteredItems.sort((a, b) => {
      const valueA =
        criteria === 'date' ? new Date(a.snippet.publishedAt).getTime() : parseInt(a.statistics.viewCount, 10);
      const valueB =
        criteria === 'date' ? new Date(b.snippet.publishedAt).getTime() : parseInt(b.statistics.viewCount, 10);

      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    });
  }

  private applyFilters() {
    this.filteredItems = this.items
      .filter((item) => item.snippet.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .filter(
        (item) =>
          item.snippet.description.toLowerCase().includes(this.filterTerm.toLowerCase()) ||
          item.snippet.title.toLowerCase().includes(this.filterTerm.toLowerCase()),
      );
    this.sortItems();
  }
}
