import { SortType } from './enums';

export interface SearchResultsData {
  kind: string;
  etag: string;
  pageInfo: PageInfoData;
  items: SearchItemData[];
}

export interface PageInfoData {
  totalResults: number;
  resultsPerPage: number;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  default: Thumbnail;
  medium: Thumbnail;
  high: Thumbnail;
  standard?: Thumbnail;
  maxres?: Thumbnail;
}

export interface Localized {
  title: string;
  description: string;
}

export interface Snippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: Thumbnails;
  channelTitle: string;
  tags: string[];
  categoryId: string;
  liveBroadcastContent: string;
  localized: Localized;
}

export interface Statistics {
  viewCount: string;
  likeCount: string;
  favoriteCount: string;
  commentCount: string;
}

export interface SearchItemData {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: Snippet;
  statistics: Statistics;
}

export interface SortConfigData {
  criteria: SortType;
  direction: SortType;
}

export interface Login {
  username: string;
  password: string;
}
