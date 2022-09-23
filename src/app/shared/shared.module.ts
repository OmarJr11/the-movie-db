import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CarouselComponent } from './components';
import { SwiperModule } from 'swiper/angular';
import { ImageLoadingDirective } from './directives/image-loading.directive';

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

const directives = [
  ImageLoadingDirective
];

@NgModule({
  declarations: [
    components,
    ImageLoadingDirective
  ],
  imports: [
    modules,
  ],
  exports: [
    modules,
    components,
    directives,
  ]
})
export class SharedModule { }
