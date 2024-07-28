import { Pipe, PipeTransform } from '@angular/core';
import { SearchItemData } from '../../types/interfaces';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(items: SearchItemData[], filterTerm: string): SearchItemData[] {
    if (!items) return [];

    // eslint-disable-next-line no-param-reassign
    // searchTerm = searchTerm.toLowerCase();
    // eslint-disable-next-line no-param-reassign
    filterTerm = filterTerm.toLowerCase();

    return items.filter(
      (item) =>
        item.snippet.title.toLowerCase().includes(filterTerm) ||
        item.snippet.description.toLowerCase().includes(filterTerm),
    );
  }
}
