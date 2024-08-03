import { SearchItemData } from '../types/interfaces';

export interface AppState {
  videos: SearchItemData[];
}

export const initialState: AppState = {
  videos: [],
};
