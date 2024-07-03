import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchItemComponent } from '../search-item/search-item.component';
import { SearchItemData, SearchResultsData } from '../../types/interfaces';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchItemComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  items: SearchItemData[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<SearchResultsData>('api/response.json').subscribe((data) => {
      this.items = data.items;
    });
  }
}
