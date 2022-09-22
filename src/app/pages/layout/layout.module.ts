import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './views';
import { HeaderComponent } from './components';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
  ]
})
export class LayoutModule { }
