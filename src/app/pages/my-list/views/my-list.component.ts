import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService, TheMovieDbService } from 'src/app/core';
import { Movie, StorageInterface } from 'src/app/core/models';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  storage: StorageInterface = {
    myList: []
  }
  myList: {
    id: number;
    isMovie: boolean;
  } [] = [];
  movies: Movie[] = [];
  spinner: boolean = false;
  notMovies: boolean = false;

  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly apiTheMoviesDB: TheMovieDbService,
    private readonly _storageService: StorageService,
    private readonly _router: Router
  ) { }

  ngOnInit(): void {
    this.spinner = true;
    const storage = this._storageService.get();
    if(storage) {
      this.storage = storage;
      this.myList.push(...this.storage.myList);
    }
    this.searchAllMoviesAndSeries();
  }

  searchAllMoviesAndSeries() {
    if(this.myList.length > 0) {
      this.notMovies = false;
      this.myList.map((item) => {
        if(item.isMovie) {
          this.getMovies(item.id);
        } else {
          this.getSeries(item.id);
        }
      });
    } else {
      this.notMovies = true;
      this.spinner = false;      
    }
  }

  getMovies(id: number) {
    this._subscription.add(
      this.apiTheMoviesDB.getMovieById(id).subscribe({
        next: (response) => {          
          this.movies.push(response);
          this.spinner = false;
        }
      })
    );
  }

  getSeries(id: number) {
    this._subscription.add(
      this.apiTheMoviesDB.getTvSerieById(id).subscribe({
        next: (response) => {
          this.movies.push(response);
          this.spinner = false;
        }
      })
    );
  }

  goToMovie(item: any) {
    if(item.title) {
      this._router.navigate(['/movie', item.id]);
    } else {
      this._router.navigate(['/tv-series', item.id]);
    }
  }
}
