import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, item: any): any {
    if (!value || !item){
      return value;
    }
    return value.filter((product: any) => product.productname.toLowerCase().indexOf(item.toLowerCase()) !== -1);
  }
}
