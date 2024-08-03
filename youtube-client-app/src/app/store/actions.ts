import { createAction, props } from '@ngrx/store';
import { SearchItemData } from '../types/interfaces';

export const loadVideos = createAction('[Search Page] Load Videos', props<{ query: string }>());
export const loadVideosSuccess = createAction(
  '[Movies API] Movies Loaded Success',
  props<{ videos: SearchItemData[] }>(),
);
