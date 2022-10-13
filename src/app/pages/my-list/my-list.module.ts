import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyListComponent } from './views';
import { SharedModule } from 'src/app/shared';
import { MyListRoutingModule } from './my-list-routing.module';



@NgModule({
  declarations: [MyListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MyListRoutingModule,
  ]
})
export class MyListModule { }
