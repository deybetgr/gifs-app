import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = '0U0w2zA9YSoF8t8CRKXtvGhLXQQ0l8r5';

  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._history.includes(query)) {
      this._history.unshift(query);
      this._history = this._history.splice(0, 10);
      localStorage.setItem('history', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', query)
      .set('limit', '12');

    this.http
      .get<SearchGifsResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((res) => {
        this.results = res.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
