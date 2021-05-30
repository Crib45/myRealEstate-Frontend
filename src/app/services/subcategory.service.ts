import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  url = "http://localhost:8080/";

  searchSize: number = 0;
  searchPrice: number = 0;

  constructor(private http: HttpClient) { }

  getSubCategoriesByCategoryTitle(categoryTitle:string) {
    return this.http.get(this.url + "subcategory/getAllByCategoryTitle/" + categoryTitle);
  }

  getSubCategoriesByCategoryId(categoryId: number) {
    return this.http.get(this.url + "subcategory/getAllByCategoryId/" + categoryId);
  }
}
