import { Component, OnInit } from '@angular/core';

import { BooksService } from './services/books.service';
import { AuthorsService } from './services/authors.service';

@Component({
  selector: 'books-root',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  title = 'books';

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
  ) {}

  ngOnInit(): void {
    this.booksService.getAll().then((resp) => console.log(resp));
    this.authorsService.getAll().then((resp) => console.log(resp));
  }

}
