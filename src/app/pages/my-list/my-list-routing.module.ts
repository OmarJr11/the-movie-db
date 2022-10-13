import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyListComponent } from './views';

const MY_LIST_ROUTES: Routes = [
  {
      path: '',
      component: MyListComponent,
  },
  /*{
      path: '**',
      redirectTo: ,
      pathMatch: 'full',
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(MY_LIST_ROUTES)],
  exports: [RouterModule]
})
export class MyListRoutingModule { }
