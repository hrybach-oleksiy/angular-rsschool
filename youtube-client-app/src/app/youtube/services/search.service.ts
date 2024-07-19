import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchItemData } from '../../types/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private items: SearchItemData[] = [];
  private searchQuery = new BehaviorSubject<string>('');
  private itemsSubject = new BehaviorSubject<SearchItemData[]>([]);
  public searchQuery$ = this.searchQuery.asObservable();
  public items$ = this.itemsSubject.asObservable();

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

  setItems(items: SearchItemData[]): void {
    this.itemsSubject.next(items);
  }

  getItemById(id: string): Observable<SearchItemData | undefined> {
    return this.items$.pipe(map((items) => items.find((item) => item.id === id)));
  }
}
