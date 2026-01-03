import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ntkReduce',
})
export class ReducePipe implements PipeTransform {
  transform<T, V>(items: T[], accumulator: (acc: V, item: T) => V, initialValue: V): V {
    return items.reduce((a, b) => accumulator(a, b), initialValue);
  }
}
