import { createSelector } from '@ngrx/store';
import { AppState } from './state';

export const selectVideos = (state: AppState) => state.videos;

export const selectAllVideos = createSelector(selectVideos, (videos) => [...videos]);
