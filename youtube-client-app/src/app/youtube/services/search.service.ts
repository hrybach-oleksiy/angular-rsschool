import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { SearchItemData, SortConfigData } from '../../types/interfaces';

import { SortType } from '../../types/enums';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private itemsSubject = new BehaviorSubject<SearchItemData[]>([]);
  public items$ = this.itemsSubject.asObservable();

  private readonly http = inject(HttpClient);

  private sortConfig = new BehaviorSubject<{ criteria: SortType; direction: SortType }>({
    criteria: SortType.DATE,
    direction: SortType.ASC,
  });
  sortConfig$ = this.sortConfig.asObservable();

  private filterTerm = new BehaviorSubject<string>('');
  filterTerm$ = this.filterTerm.asObservable();

  public searchVideos(query: string): void {
    const params = new HttpParams().set('type', 'video').set('part', 'snippet').set('maxResults', '8').set('q', query);

    this.http
      .get<{ items: SearchItemData[] }>('search', { params })
      .pipe(
        map((response) => response.items),
        switchMap((items) => {
          const videoIds = items.map((item) => item.id.videoId).join(',');

          return this.getVideoStatistics(videoIds);
        }),
      )
      .subscribe((items) => this.itemsSubject.next(items));
  }

  private getVideoStatistics(videoIds: string): Observable<SearchItemData[]> {
    const params = new HttpParams().set('part', 'snippet,statistics').set('id', videoIds);

    return this.http.get<{ items: SearchItemData[] }>('videos', { params }).pipe(map((response) => response.items));
  }

  public setSortConfig(config: SortConfigData): void {
    this.sortConfig.next(config);
  }

  public setFilterTerm(term: string): void {
    this.filterTerm.next(term);
  }

  public setItems(items: SearchItemData[]): void {
    this.itemsSubject.next(items);
  }

  public getItemById(id: string): Observable<SearchItemData | undefined> {
    return this.items$.pipe(
      map((items) => items.find((item) => (typeof item.id === 'string' ? item.id === id : item.id.videoId === id))),
    );
  }
}
