import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { SortType } from '../types/enums';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuery.asObservable();

  private sortConfig = new BehaviorSubject<{ criteria: SortType; direction: SortType }>({
    criteria: SortType.DATE,
    direction: SortType.ASC,
  });
  sortConfig$ = this.sortConfig.asObservable();

  private filterTerm = new BehaviorSubject<string>('');
  filterTerm$ = this.filterTerm.asObservable();

  setSearchQuery(query: string) {
    this.searchQuery.next(query);
  }

  setSortConfig(config: { criteria: SortType; direction: SortType }) {
    this.sortConfig.next(config);
  }

  setFilterTerm(term: string) {
    this.filterTerm.next(term);
  }
}
