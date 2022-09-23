import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home';
import { HomeSeriesComponent, MovieDetailsComponent, TvSeriesDetailsComponent } from '../movies';
import { HomeMoviesComponent } from '../movies/views/home-movies/home-movies.component';
import { LayoutComponent } from './views';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'movies',
        component: HomeMoviesComponent,
      },
      {
        path: 'tv-series',
        component: HomeSeriesComponent,
      },
      {
        path: 'movie/:id',
        component: MovieDetailsComponent,
      },
      {
        path: 'tv-series/:id',
        component: TvSeriesDetailsComponent,
      },
      {
        path: '**',
        component: HomeComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
