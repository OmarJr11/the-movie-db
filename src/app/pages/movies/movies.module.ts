import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesRoutingModule } from './movies-routing.module';
import { MovieDetailsComponent } from './views/movie-details/movie-details.component';
import { SharedModule } from 'src/app/shared';
import { TvSeriesDetailsComponent } from './views/tv-series-details/tv-series-details.component';
import { HomeMoviesComponent } from './views/home-movies/home-movies.component';
import { HomeSeriesComponent } from './views/home-series/home-series.component';

@NgModule({
  declarations: [
    MovieDetailsComponent,
    TvSeriesDetailsComponent,
    HomeMoviesComponent,
    HomeSeriesComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule,
  ]
})
export class MoviesModule { }
