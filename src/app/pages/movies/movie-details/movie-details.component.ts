import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TheMovieDbService } from 'src/app/core';
import { Movie } from 'src/app/core/models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
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
      this.apiTheMoviesDB.getMovieById(this.id).subscribe({
        next: (response) => {
          this.movie = response;
          this.movie.poster_path = this.imageUrl + this.movie.poster_path;
        }
      })
    );

    this._subscription.add(
      this.apiTheMoviesDB.getMoviesSimilar(this.id).subscribe({
        next: (response) => {
          this.movies = response.results.slice(0, 10);
          console.log(this.movies);
        }
      })
    );
  }

  goToMovie(item: any) {    
    if(item.isMovie) {
      this._router.navigate(['/movie', item.movie.id]);
    }
  }

  getImageCompany(path: string) {
    return this.imageUrl + path;
  }
}
