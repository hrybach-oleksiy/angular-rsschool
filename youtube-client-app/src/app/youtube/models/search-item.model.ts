import { SearchItemData, Snippet, Statistics } from '../../types/interfaces';

export class SearchItemModel implements SearchItemData {
  private _id: string;
  private _etag: string;
  private _kind: string;
  private _snippet: Snippet;
  private _statistics: Statistics;

  constructor(id: string, etag: string, kind: string, snippet: Snippet, statistics: Statistics) {
    this._id = id;
    this._etag = etag;
    this._kind = kind;
    this._snippet = snippet;
    this._statistics = statistics;
  }

  public get id(): string {
    return this._id;
  }

  public get etag(): string {
    return this._etag;
  }

  public get kind(): string {
    return this._kind;
  }

  public get snippet(): Snippet {
    return this._snippet;
  }

  public get statistics(): Statistics {
    return this._statistics;
  }
}
