import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TheMovieDbService } from 'src/app/core';
import { Movie } from 'src/app/core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logo: string = 'assets/images/logo.svg';
  routes = [
    {
      path: '/movies',
      name: 'Movies'
    },
    {
      path: '/tv-series',
      name: 'Tv series'
    },
    {
      path: '/my-list',
      name: 'My list'
    },
  ];
  search: string = '';
  letters: number = 0;
  spinner: boolean = false;
  movies: Movie[] = [];

  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly apiTheMoviesDB: TheMovieDbService,
    private readonly _router: Router
  ) { }

  ngOnInit() {
  }

  searchKeydown(event?: any) {
    if (event && event.keyCode === 13 && this.search !== '') {
      this.goToSearch();
    } else if (event && event.keyCode === 8) {
      this.letters = this.letters === 0 ? 0 : this.letters - 1;
      if(this.letters === 0) {
        this.movies = [];
      } else {
        this.searchAll(this.search);
      }
    } else {
      this.letters++;
      this.searchAll(this.search);
    }
  }

  goToSearch() {
    this._router.navigate(['/search'], { queryParams: { search: this.search}});
    this.search = '';
    this.movies = [];
  }

  goToMovieOrSerie(movie: Movie) {
    if(movie.media_type === 'movie') {
      this._router.navigate(['/movie', movie.id]);
      this.search = '';
      this.movies = [];
    } else {
      this._router.navigate(['/tv-series', movie.id]);
      this.search = '';
      this.movies = [];
    }
  }

  searchClick() {
    if(this.search !== '') {
      this.goToSearch();
    }
  }

  searchAll(search: string) {
    this.spinner = true;
    this._subscription.add(
      this.apiTheMoviesDB.searchMulti(search, 1).subscribe({
        next: (response) => {
          if(response && response.results.length > 0) {
            this.movies = (response.results.slice(0, 5)).filter((m: Movie) => m.media_type !== 'person');            
          }
          this.spinner = false;
        },
        error: () => {
          this.spinner = false;
        }
      })
    );
  }

  loadImage(movie: Movie) {
    return 'https://image.tmdb.org/t/p/original' + movie.poster_path
  }
}
