import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { SearchItemData } from '../../types/interfaces';

import { SortType } from '../../types/enums';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private searchApiUrl = 'https://www.googleapis.com/youtube/v3/search';
  private videosApiUrl = 'https://www.googleapis.com/youtube/v3/videos';
  private apiKey = 'AIzaSyBGIs4LV1iC5Ukvjf1IlDuxp4uN6HQmxfo';
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
    const params = new HttpParams()
      .set('key', this.apiKey)
      .set('type', 'video')
      .set('part', 'snippet')
      .set('maxResults', '6')
      .set('q', query);

    this.http
      .get<{ items: SearchItemData[] }>(this.searchApiUrl, { params })
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
    const params = new HttpParams().set('key', this.apiKey).set('part', 'snippet,statistics').set('id', videoIds);

    return this.http
      .get<{ items: SearchItemData[] }>(this.videosApiUrl, { params })
      .pipe(map((response) => response.items));
  }

  public setSortConfig(config: { criteria: SortType; direction: SortType }): void {
    this.sortConfig.next(config);
  }

  public setFilterTerm(term: string): void {
    this.filterTerm.next(term);
  }

  public setItems(items: SearchItemData[]): void {
    this.itemsSubject.next(items);
  }

  public getItemById(id: string): Observable<SearchItemData | undefined> {
    return this.items$.pipe(map((items) => items.find((item) => item.id.videoId === id)));
  }
}
