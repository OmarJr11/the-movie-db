import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {

  constructor(private _http: HttpClient) { }
  
  getNowPlaying(): Observable<any> {
    return this._http.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=b3eff2fcae58daac15989c11c538144d`)
  }

  getMoviesPopular(): Observable<any> {
    return this._http.get(`https://api.themoviedb.org/3/movie/popular?api_key=b3eff2fcae58daac15989c11c538144d`)
  }

  getUpcoming(): Observable<any> {
    return this._http.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=b3eff2fcae58daac15989c11c538144d`)
  }

  getMovieById(id: number): Observable<any> {
    return this._http.get(`https://api.themoviedb.org/3/movie/${id}?api_key=b3eff2fcae58daac15989c11c538144d`)
  }

  getMoviesSimilar(id: number): Observable<any> {
    return this._http.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=b3eff2fcae58daac15989c11c538144d`)
  }

  getTvPopular(): Observable<any> {
    return this._http.get(`https://api.themoviedb.org/3/tv/popular?api_key=b3eff2fcae58daac15989c11c538144d`)
  }
}
