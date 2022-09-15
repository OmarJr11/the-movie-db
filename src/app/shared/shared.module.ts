import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';

const modules = [
  MatSidenavModule
]

@NgModule({
  declarations: [],
  imports: [
    modules,
    CommonModule
  ]
})
export class SharedModule { }
