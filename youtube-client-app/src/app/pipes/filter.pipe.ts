import { Pipe, PipeTransform } from '@angular/core';
import { SearchItemData } from '../types/interfaces';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(items: SearchItemData[], searchText: string): SearchItemData[] {
    if (!items) return [];
    if (!searchText) return items;
    // eslint-disable-next-line no-param-reassign
    searchText = searchText.toLowerCase();
    return items.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(searchText);
    });
  }
}
