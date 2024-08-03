import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/state';
import { AsyncPipe, CommonModule } from '@angular/common';
import { SearchItemComponent } from '../search-item/search-item.component';
import { SearchItemData } from '../../../types/interfaces';
import { FilterPipe } from '../../pipes/filter.pipe';

import { CustomCardComponent } from '../custom-card/custom-card.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [SearchItemComponent, CustomCardComponent, FilterPipe, AsyncPipe, CommonModule],
  // templateUrl: './search-results.component.html',
  template: `
    <div *ngFor="let movie of movies$ | async">
      {{ movie.snippet.title }}
    </div>
  `,
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  movies$: Observable<SearchItemData[]> = this.store.select((state) => state.videos);

  constructor(private store: Store<AppState>) {
    console.log('component renders');
  }

  ngOnInit(): void {
    this.movies$.subscribe((movies) => {
      console.log('component movies', movies);
    });
  }

  // get videos() {
  //   let videoList: SearchItemData[] = [];
  //   // eslint-disable-next-line no-return-assign
  //   this.movies$.subscribe((videos) => (videoList = videos));
  //   console.log('video list', videoList);
  //   return videoList;
  // }

  // eslint-disable-next-line class-methods-use-this
  // public isSearchItemData(video: SearchItemData | CustomCard | undefined): video is SearchItemData {
  //   return (video as SearchItemData).id !== undefined;
  // }
  // private sortItems() {
  //   const { criteria, direction } = this.sortConfig();

  //   this.filteredItems().sort((a, b) => {
  //     const valueA =
  //       criteria === SortType.DATE ? new Date(a.snippet.publishedAt).getTime() : parseInt(a.statistics.viewCount, 10);
  //     const valueB =
  //       criteria === SortType.DATE ? new Date(b.snippet.publishedAt).getTime() : parseInt(b.statistics.viewCount, 10);

  //     return direction === SortType.ASC ? valueA - valueB : valueB - valueA;
  //   });
  // }

  // private applyFilters() {
  //   const filterTerm = this.filterTerm().toLowerCase();

  //   this.filteredItems.set(
  //     this.items().filter(
  //       (item) =>
  //         item.snippet.description.toLowerCase().includes(filterTerm) ||
  //         item.snippet.title.toLowerCase().includes(filterTerm),
  //     ),
  //   );
  //   this.sortItems();
  // }
}
