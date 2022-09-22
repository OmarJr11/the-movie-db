import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view';

const HOME_ROUTES: Routes = [
  {
      path: '',
      component: HomeComponent,
  },
  /*{
      path: '**',
      redirectTo: ,
      pathMatch: 'full',
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
