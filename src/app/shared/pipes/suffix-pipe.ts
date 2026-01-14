import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipes',
})
export class SuffixPipe implements PipeTransform {
  transform(value: string): unknown {
    return value + '🧙🏼‍♂️';
  }
}
