import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchQuery = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuery.asObservable();

  private sortConfig = new BehaviorSubject<{ criteria: string; direction: string }>({
    criteria: 'date',
    direction: 'asc',
  });
  sortConfig$ = this.sortConfig.asObservable();

  private filterTerm = new BehaviorSubject<string>('');
  filterTerm$ = this.filterTerm.asObservable();

  setSearchQuery(query: string) {
    this.searchQuery.next(query);
  }

  setSortConfig(config: { criteria: string; direction: string }) {
    this.sortConfig.next(config);
  }

  setFilterTerm(term: string) {
    this.filterTerm.next(term);
  }
}
