import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TheMovieDbService } from 'src/app/core';
import { Movie } from 'src/app/core/models/movie.model';

@Component({
  selector: 'app-home-series',
  templateUrl: './home-series.component.html',
  styleUrls: ['./home-series.component.scss']
})
export class HomeSeriesComponent implements OnInit {
  mostPopular!: Movie;
  tvSeriesTopRated!: Movie[];
  tvSeriesUpcoming!: Movie[];
  tvSeriesPopular!: Movie[];

  private readonly urlImage = 'https://image.tmdb.org/t/p/original';
  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly apiTheMoviesDB: TheMovieDbService,
    private readonly _router: Router
  ) { }
  
  ngOnInit(): void {
    this._subscription.add(
      this.apiTheMoviesDB.getAiringToday().subscribe({
        next: (response) => {
          this.tvSeriesTopRated = response.results.slice(0, 10);
          this.mostPopular = response.results[0];
          this.mostPopular.backdrop_path = this.urlImage + this.mostPopular.backdrop_path;
          this.getTvPopular();
          this.getTvSeriesUpcoming();
        }
      })
    );
  }

  getTvPopular() {
    this._subscription.add(
      this.apiTheMoviesDB.getTvPopular().subscribe({
        next: (response) => {
          this.tvSeriesPopular = response.results.slice(0, 10);          
        }
      })
    );
  }

  getTvSeriesUpcoming() {
    this._subscription.add(
      this.apiTheMoviesDB.getTvSeriesUpcoming().subscribe({
        next: (response) => {
          this.tvSeriesUpcoming = response.results.slice(0, 4);          
        }
      })
    );
  }

  selectMovie(movie: Movie) {
    this.mostPopular = movie;
  }

  goToMovie(item: any) {    
    if(!item.isMovie) {
      this._router.navigate(['/tv-series', item.movie.id]);
    }
  }

  searchImage(movie: Movie) {
    return this.urlImage + movie.backdrop_path
  }

  searchImagePosterPath(movie: Movie) {    
    return this.urlImage + movie.poster_path
  }
}
