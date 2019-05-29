import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';

import { ConfigService } from './services/config.service';
import { BackendService } from './services/backend.service';
import { ConditionsService } from './services/conditions.service';
import { BooksService } from './services/books.service';
import { AuthorsService } from './services/authors.service';

import { booksInitializer } from './books.initializer';

@NgModule({
  declarations: [
    BooksComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BooksRoutingModule,
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
