import { PizzaListComponent } from './pizza/pizza-list/pizza-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'pizza', component: PizzaListComponent },
  { path: '',
    redirectTo: 'pizza',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
