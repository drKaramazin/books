import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chooseCover'
})
export class ChooseCoverPipe implements PipeTransform {

  transform(index: number): string {
    return index % 4 === 0 ? '4.jpg' : index % 3 === 0 ? '3.jpg' : index % 2 === 0 ? '2.jpg' : '1.jpg';
  }

}
