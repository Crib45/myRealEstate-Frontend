import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getNumber() {
    return this.http.get(this.url + "notifications/getNumber", { responseType: 'text' } )
  }

  getAll() {
    return this.http.get(this.url + "notifications/getAll")
  }

}
