import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Advertisement } from '../models/Advertisement';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  save(advertisement: Advertisement) {
    return this.http.post(this.url + "advertisement/save",  advertisement );
  }

  delete(id: Number) {
    return this.http.delete(this.url + "advertisement/delete/"+id,{ responseType: 'text' });
  }

  getAllByOwned() {
    return this.http.get(this.url + "advertisement/getAllByLogged");
  }
}