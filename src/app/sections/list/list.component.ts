import { Component, OnInit } from '@angular/core';

import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { Author } from '../../models/author';
import { AuthorsService } from '../../services/authors.service';
import { ChartType } from '../../models/chart-type';
import { LABEL_FROM_CHART_TYPE } from '../../models/label-by-chart-type';

@Component({
  selector: 'books-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  LABEL_FROM_CHART_TYPE = LABEL_FROM_CHART_TYPE;
  ChartType = ChartType;

  hiddenAuthor = true;

  books: Book[];
  authors: Author[];

  chartType: ChartType = ChartType.MONTHS;

  constructor(
    private booksService: BooksService,
    private authorsService: AuthorsService,
  ) {}

  ngOnInit(): void {
    this.booksService.getAll().then((resp) => this.books = resp);
  }

  authorBehavior() {
    this.hiddenAuthor = !this.hiddenAuthor;
    if (!this.hiddenAuthor) {
      this.authorsService.getAll().then((resp) => this.authors = resp);
    } else {
      this.authors = null;
    }
  }

}
