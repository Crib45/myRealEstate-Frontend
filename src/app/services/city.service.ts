import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getAllCities(){
    return this.http.get(this.url + "city/getAll");
  }
}
