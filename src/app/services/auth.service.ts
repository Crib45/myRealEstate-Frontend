import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  getAuthorizationToken() {
    return sessionStorage.getItem('token');
  }

  get getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + sessionStorage.getItem('token'));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return headers;
  }

  login(user: User) {
    return this.http.post(this.url + "user/login",  user );
  }

  isLoggedIn():boolean {
    if (sessionStorage.getItem('token') == '' || sessionStorage.getItem('token') == null) {
      return false;
    }
    else return true;
  }

  logout() {
    sessionStorage.setItem('token', '');
  }

}
