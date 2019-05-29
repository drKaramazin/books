import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { Id } from '../../models/primitives';

@Component({
  selector: 'books-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
})
export class DescriptionComponent implements OnInit, OnDestroy {

  params$: Subscription;

  books: Book[];

  currentBook: Book;
  currentBookId: Id;

  constructor(
    private booksService: BooksService,
    private route: ActivatedRoute,
  ) {}

  changeCurrentBook() {
    if (this.books && this.currentBookId) {
      this.currentBook = this.books.find((book) => book.ID === this.currentBookId);
    }
  }

  ngOnInit(): void {
    this.booksService.getAll().then((resp) => {
      this.books = resp;
      this.changeCurrentBook();
    });

    this.route.params.subscribe((params) => {
      this.currentBookId = Number(params.bookId);
      this.changeCurrentBook();
    });
  }

  ngOnDestroy(): void {
    if (this.params$) {
      this.params$.unsubscribe();
    }
  }

}
