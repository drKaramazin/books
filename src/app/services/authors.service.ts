import { Injectable } from '@angular/core';

import { BackendService } from './backend.service';
import { Author } from '../models/author';

@Injectable()
export class AuthorsService {

  constructor(
    private backend: BackendService,
  ) {}

  getAll(): Promise<Author[]> {
    return this.backend.get('Authors');
  }

}
