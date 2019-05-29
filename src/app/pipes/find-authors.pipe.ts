import { Pipe, PipeTransform } from '@angular/core';

import { Id } from '../models/primitives';
import { Author } from '../models/author';

@Pipe({
  name: 'findAuthors'
})
export class FindAuthorsPipe implements PipeTransform {

  transform(bookId: Id, authors: Author[]): Author[] {
    return authors.filter((author) => author.IDBook === bookId);
  }

}
