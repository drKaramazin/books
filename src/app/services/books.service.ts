import { Injectable } from '@angular/core';

import { BackendService } from './backend.service';
import { Book } from '../models/book';

@Injectable()
export class BooksService {

  private booksCache: Book[];

  constructor(
    private backend: BackendService,
  ) {}

  getAll(): Promise<Book[]> {
    return new Promise<Book[]>(((resolve, reject) => {
      if (this.booksCache) {
        resolve(this.booksCache);
      } else {
        this.backend.get('Books')
          .then((resp) => {
            this.booksCache = resp;
            resolve(this.booksCache);
          }).catch((err) => reject(err));
      }
    }));
  }

}
