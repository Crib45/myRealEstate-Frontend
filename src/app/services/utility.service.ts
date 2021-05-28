import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getAllByAdvertId(advertId: number) {
    return this.http.get(this.url + "utilityEstate/getAllByAdvertId/" + advertId);
  }
  save(data: any) {
    return this.http.post(this.url + "utilityEstate/saveAll", data, { responseType: 'text' })
  }
}
