import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent } from './components';
import { SwiperModule } from 'swiper/angular';

const modules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  FlexLayoutModule,
  CommonModule,
  SwiperModule
];

const components = [
  CarouselComponent
];

@NgModule({
  declarations: [
    components
  ],
  imports: [
    modules,
  ],
  exports: [
    modules,
    components
  ]
})
export class SharedModule { }
