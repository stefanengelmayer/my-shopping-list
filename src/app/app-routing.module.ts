import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './feature/list/list.component';
import {PdfViewerComponent} from './feature/pdf-viewer/pdf-viewer.component';
import {SuggestionsComponent} from './feature/suggestions/suggestions.component';

const routes: Routes = [
  {path: 'list', component: ListComponent},
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'kochbuch', component: PdfViewerComponent},
  {path: 'suggestions', component: SuggestionsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
