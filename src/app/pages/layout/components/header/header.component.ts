import { Component, OnInit } from '@angular/core';

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
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
