import { createReducer, on } from '@ngrx/store';
import { initialState } from './state';
import { loadVideos, loadVideosSuccess } from './actions';

export const appReducer = createReducer(
  initialState,

  on(loadVideos, (state, { query }) => ({
    ...state,
    query,
  })),
  on(loadVideosSuccess, (state, { videos }) => {
    console.log('reducer videos', videos);
    return {
      ...state,
      videos,
    };
  }),
);
