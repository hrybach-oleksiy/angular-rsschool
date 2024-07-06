import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchItemComponent } from '../search-item/search-item.component';
import { SearchItemData, SearchResultsData } from '../../types/interfaces';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchItemComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  items: SearchItemData[] = [];
  filteredItems: SearchItemData[] = [];
  showResults: boolean = false;

  constructor(
    private http: HttpClient,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    this.http.get<SearchResultsData>('api/response.json').subscribe((data) => {
      this.items = data.items;
    });

    this.searchService.searchQuery$.subscribe((query) => {
      if (query) {
        this.filteredItems = this.items.filter((item) =>
          item.snippet.title.toLowerCase().includes(query.toLowerCase()),
        );
        this.showResults = true;
      } else {
        this.filteredItems = [];
        this.showResults = false;
      }
    });
  }
}
