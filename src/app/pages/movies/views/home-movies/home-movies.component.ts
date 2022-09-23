import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TheMovieDbService } from 'src/app/core';
import { Movie } from 'src/app/core/models/movie.model';

@Component({
  selector: 'app-home-movies',
  templateUrl: './home-movies.component.html',
  styleUrls: ['./home-movies.component.scss']
})
export class HomeMoviesComponent implements OnInit {
  mostPopular!: Movie;
  moviesTopRated!: Movie[];
  moviesPopular!: Movie[];
  moviesUpcoming!: Movie[];

  private readonly urlImage = 'https://image.tmdb.org/t/p/original';
  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly apiTheMoviesDB: TheMovieDbService,
    private readonly _router: Router
  ) { }
  
  ngOnInit(): void {
    this._subscription.add(
      this.apiTheMoviesDB.getNowPlaying().subscribe({
        next: (response) => {
          this.moviesTopRated = response.results.slice(0, 10);
          this.mostPopular = response.results[0];
          this.mostPopular.backdrop_path = this.urlImage + this.mostPopular.backdrop_path;
          this.getMoviesPopular();
          this.getMoviesUpcoming();
        }
      })
    );
  }

  getMoviesPopular() {
    this._subscription.add(
      this.apiTheMoviesDB.getMoviesPopular().subscribe({
        next: (response) => {
          this.moviesPopular = response.results.slice(0, 10);        
        }
      })
    );
  }

  getMoviesUpcoming() {
    this._subscription.add(
      this.apiTheMoviesDB.getUpcoming().subscribe({
        next: (response) => {
          this.moviesUpcoming = response.results.slice(0, 4);          
        }
      })
    );
  }

  selectMovie(movie: Movie) {
    this.mostPopular = movie;
  }

  goToMovie(item: any) {    
    if(item.isMovie) {
      this._router.navigate(['/movie', item.movie.id]);
    }
  }

  searchImage(movie: Movie) {
    return this.urlImage + movie.backdrop_path
  }

  searchImagePosterPath(movie: Movie) {    
    return this.urlImage + movie.poster_path
  }
}
