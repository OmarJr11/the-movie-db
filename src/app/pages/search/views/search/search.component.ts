import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TheMovieDbService } from 'src/app/core';
import { Movie } from 'src/app/core/models/movie.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy, DoCheck {
  search: string = String(this._activatedRoute.snapshot.queryParams['search']);
  searchAux: string = String(this._activatedRoute.snapshot.queryParams['search']);
  movies: Movie[] = [];
  page: number = 0;
  totalPage: number = 1;
  spinner: boolean = false;
  firstSearch: boolean = false;

  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly apiTheMoviesDB: TheMovieDbService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router
  ) { }

  ngDoCheck(): void {
    if(
      String(this._activatedRoute.snapshot.queryParams['search']) !== this.searchAux
    ) {
      this.search = String(this._activatedRoute.snapshot.queryParams['search']);
      this.searchAux = String(this._activatedRoute.snapshot.queryParams['search']);
      this.movies = [];
      this.page = 0;
      this.totalPage = 1;
      this.spinner = false;
      this.firstSearch = false;
      this.onScrollDown();
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {    
    if(this.search) {
      this.onScrollDown();
    }
  }
  
  searchAll(search: string, page: number) {
    this.spinner = true;
    this._subscription.add(
      this.apiTheMoviesDB.searchMulti(search, page).subscribe({
        next: (response) => {
          this.movies.push(...response.results);
          this.totalPage = response.total_pages;
          this.spinner = false;
        },
        error: (e) => {
          this.spinner = false;
          console.log(e);
        }
      })
    );
  }

  onScrollDown() {
    if (!this.spinner && this.page !== this.totalPage) {      
      this.page++;
      this.firstSearch = true;
      this.searchAll(this.search, this.page);
    }
  }

  goToMovie(item: Movie) {
    if(item.media_type === 'movie') {
      this._router.navigate(['/movie', item.id]);
    } else {
      this._router.navigate(['/tv-series', item.id]);
    }
  }
}
