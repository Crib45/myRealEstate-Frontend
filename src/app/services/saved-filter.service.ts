import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SavedFilterService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getAllForLogged() {
    return this.http.get(this.url + "savedFilters/getAllForLogged" )
  }

  delete(savedFilterId: Number) {
    return this.http.delete(this.url + "savedFilters/" + savedFilterId, { responseType: 'text' })
  }

  save(savedFilter:any) {
    return this.http.post(this.url + "savedFilters", savedFilter, { responseType: 'text' })
  }
}
