import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MomentModule } from 'ngx-moment';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { ListComponent } from './sections/list/list.component';
import { DescriptionComponent } from './sections/description/description.component';

import { ChooseCoverPipe } from './pipes/choose-cover.pipe';
import { FindAuthorsPipe } from './pipes/find-authors.pipe';
import { AuthorPipe } from './pipes/author.pipe';

import { ConfigService } from './services/config.service';
import { BackendService } from './services/backend.service';
import { ConditionsService } from './services/conditions.service';
import { BooksService } from './services/books.service';
import { AuthorsService } from './services/authors.service';

import { booksInitializer } from './books.initializer';

@NgModule({
  declarations: [
    BooksComponent,
    ListComponent,
    DescriptionComponent,

    ChooseCoverPipe,
    FindAuthorsPipe,
    AuthorPipe,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    NgbModule,
    BooksRoutingModule,
    MomentModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: booksInitializer,
      deps: [ ConfigService, BackendService ],
      multi: true,
    },

    ConfigService,
    BackendService,
    ConditionsService,
    BooksService,
    AuthorsService,
  ],
  bootstrap: [ BooksComponent ],
})
export class BooksModule {}
