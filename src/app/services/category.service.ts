import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getAllCategories(){
    return this.http.get(this.url + "categories");
  }
}
