import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdvertCommentsService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getAllByAdvertId(advertId:number) {
    return this.http.get(this.url + "advertComments/getAllByAdvertId/" + advertId)
  }

  save(data: any) {
    return this.http.post(this.url + "advertComments",  data ,{ responseType: 'text' });
  }
}
