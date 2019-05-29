import { Injectable } from '@angular/core';

import { BackendService } from './backend.service';
import { Book } from '../models/book';

@Injectable()
export class BooksService {

  constructor(
    private backend: BackendService,
  ) {}

  getAll(): Promise<Book[]> {
    return this.backend.get('Books');
  }

}
