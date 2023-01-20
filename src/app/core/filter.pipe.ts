import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    let allKeys = Object.keys(items[0]);
    let keysToIgnore = ['_id'];

    allKeys = allKeys.filter((k) => {
      return keysToIgnore.indexOf(k) === -1
    })

    return items.filter(it => {
      return allKeys.filter((k) => {
        return k != '_id' && (it[k] || '').toString().toLowerCase().includes(searchText);
      }).length > 0
    });
  }
}
