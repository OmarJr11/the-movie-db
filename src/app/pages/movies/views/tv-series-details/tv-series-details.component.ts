import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService, TheMovieDbService } from 'src/app/core';
import { StorageInterface } from 'src/app/core/models';
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
  spinner: boolean = false;
  myList: {
    id: number;
    isMovie: boolean;
  } [] = [];
  storage: StorageInterface = { myList: []}
  saved: boolean = false;

  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly apiTheMoviesDB: TheMovieDbService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.spinner = true;
    this._subscription.add(
      this.apiTheMoviesDB.getTvSerieById(this.id).subscribe({
        next: (response) => {
          this.spinner = false;
          this.movie = response;
          const storage = this._storageService.get();
          if(storage) {
            this.storage = storage;
            this.myList.push(...this.storage.myList);
            this.saved = this.myList.findIndex((movie) => Number(movie) === Number(this.movie.id)) !== -1;
          }
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

  actionsMyList(idMovie: number) {
    if(!this.saved) {
      this.myList.push({ 
        id: Number(idMovie),
        isMovie: false,
      });
    } else {
      this.myList = this.myList.filter((movie) => Number(movie.id) !== Number(idMovie));
    }
    this.storage.myList = this.myList;
    this._storageService.set(this.storage);
    this.saved = !this.saved;
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
