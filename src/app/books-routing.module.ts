import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './sections/list/list.component';
import { DescriptionComponent } from './sections/description/description.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'desc/:bookId', component: DescriptionComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
