import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TheMovieDbService } from 'src/app/core';

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
  search!: string;

  private _subscription: Subscription = new Subscription();

  constructor(
    private readonly apiTheMoviesDB: TheMovieDbService,
    private readonly _router: Router
  ) { }

  ngOnInit() {
  }

  searchKeydown(event?: any) {
    if (event && event.keyCode === 13) {
      this._router.navigate(['/search'], { queryParams: { search: this.search}});
    }
  }

  searchClick() {
    this._router.navigate(['/search', this.search]);
  }
}
