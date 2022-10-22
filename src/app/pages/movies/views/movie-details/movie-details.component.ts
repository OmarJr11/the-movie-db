import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService, TheMovieDbService } from 'src/app/core';
import { StorageInterface } from 'src/app/core/models';
import { Movie } from 'src/app/core/models/movie.model';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, DoCheck {
  movie!: Movie;
  movies!: Movie[];
  id: number = Number(this._activatedRoute.snapshot.paramMap.get('id'));
  idAux: number = Number(this._activatedRoute.snapshot.paramMap.get('id'));
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

  ngDoCheck(): void {
    if(
      Number(this._activatedRoute.snapshot.paramMap.get('id')) !== this.idAux
    ) {
      this.spinner = true;
      this.id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
      this.idAux = Number(this._activatedRoute.snapshot.paramMap.get('id'));
      this.getMovieById();
    }
  }

  ngOnInit(): void {
    this.spinner = true;
    this.getMovieById();
  }

  getMovieById() {
    this._subscription.add(
      this.apiTheMoviesDB.getMovieById(this.id).subscribe({
        next: (response) => {
          this.spinner = false;
          this.movie = response;
          const storage = this._storageService.get();
          
          if(storage) {
            this.storage = storage;
            this.myList.push(...this.storage.myList);
            this.saved = this.myList.findIndex((movie) => Number(movie.id) === Number(this.movie.id)) !== -1;
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
      this.myList.unshift({ 
        id: Number(idMovie),
        isMovie: true,
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
