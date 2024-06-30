import { PageInfoData, SearchItemData, SearchResultsData } from '../types/interfaces';

export class SearchResponseModel implements SearchResultsData {
  etag!: string;
  kind!: string;
  pageInfo!: PageInfoData;
  items!: SearchItemData;
}
