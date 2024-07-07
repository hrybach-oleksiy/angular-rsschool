import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // setSortConfig(arg0: { criteria: string; direction: string }) {
  //   throw new Error('Method not implemented.');
  // }
  // private searchQuery = new BehaviorSubject<string>('');
  // searchQuery$ = this.searchQuery.asObservable();

  // setSearchQuery(query: string) {
  //   this.searchQuery.next(query);
  // }
  private searchQuery = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuery.asObservable();

  private sortConfig = new BehaviorSubject<{ criteria: string; direction: string }>({
    criteria: 'date',
    direction: 'asc',
  });
  sortConfig$ = this.sortConfig.asObservable();

  setSearchQuery(query: string) {
    this.searchQuery.next(query);
  }

  setSortConfig(config: { criteria: string; direction: string }) {
    this.sortConfig.next(config);
  }
}
