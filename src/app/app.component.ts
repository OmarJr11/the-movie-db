import { Component, OnInit } from '@angular/core';
import { SeoService } from './core/services/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'the-movie-db';

  constructor(private _seo: SeoService) {}

  ngOnInit(): void {
    this._seo.initSeoMetaTags();
  }
}
