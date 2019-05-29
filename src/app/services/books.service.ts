import { Injectable } from '@angular/core';

import { BackendService } from './backend.service';

@Injectable()
export class BooksService {

  constructor(
    private backend: BackendService,
  ) {}

  getAll(): Promise<any> {
    return this.backend.get('Books');
  }

}
