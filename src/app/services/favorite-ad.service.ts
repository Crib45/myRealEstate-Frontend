import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advertisement } from '../models/Advertisement';

@Injectable({
  providedIn: 'root'
})
export class FavoriteAdService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  saveFavorite(advertisement:Advertisement) {
    return this.http.post(this.url + "favoriteAd", advertisement )
  }

  delete(favoriteAdId: Number) {
    return this.http.delete(this.url + "favoriteAd/" + favoriteAdId, { responseType: 'text' })
  }

}
