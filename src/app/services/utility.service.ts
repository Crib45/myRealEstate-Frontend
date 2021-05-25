import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getAllByAdvertId(advertId: number) {
    return this.http.get(this.url + "utilities/getAllByAdvertId/" + advertId);
  }
}
