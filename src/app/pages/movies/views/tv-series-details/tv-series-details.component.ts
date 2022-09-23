import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TheMovieDbService } from 'src/app/core';
import { Movie } from 'src/app/core/models/movie.model';

@Component({
  selector: 'app-tv-series-details',
  templateUrl: './tv-series-details.component.html',
  styleUrls: ['./tv-series-details.component.scss']
})
export class TvSeriesDetailsComponent implements OnInit {
  movie!: Movie;
  movies!: Movie[];
  id: number = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  imageUrl: string = 'https://image.tmdb.org/t/p/original';
  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly apiTheMoviesDB: TheMovieDbService,
    private _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
  ) { }

  ngOnInit(): void {
    this._subscription.add(
      this.apiTheMoviesDB.getTvSerieById(this.id).subscribe({
        next: (response) => {
          this.movie = response;
          console.log(this.movie);
          
          this.getMoviesSimilar();
        }
      })
    );
  }

  goToMovie(item: any) {    
    if(item.isMovie) {
      this._router.navigate(['/movie', item.movie.id]);
    }
  }

  searchImage() {
    return this.imageUrl + this.movie.poster_path;
  }

  private getMoviesSimilar() {
    this._subscription.add(
      this.apiTheMoviesDB.getMoviesSimilar(this.id).subscribe({
        next: (response) => {
          this.movies = response.results.slice(0, 10);
        }
      })
    );
  }
}
