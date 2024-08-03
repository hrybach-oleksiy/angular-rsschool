import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { SearchService } from '../youtube/services/search.service';
import { loadVideos, loadVideosSuccess } from './actions';

@Injectable()
export class AppEffects {
  constructor(
    private actions$: Actions,
    private searchService: SearchService,
  ) {}

  loadVideos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadVideos),
      exhaustMap((action) =>
        this.searchService.searchVideos(action.query).pipe(
          map((videos) => loadVideosSuccess({ videos })),
          tap((videos) => console.log('effect videos', videos)),
          catchError(() => EMPTY),
        ),
      ),
    ),
  );
}
