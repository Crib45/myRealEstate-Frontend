import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getAuthorizationToken() {
    return sessionStorage.getItem('token');
  }

  get getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + sessionStorage.getItem('token'));
    headers = headers.append("Content-Type", "application/x-www-form-urlencoded");
    return headers;
  }
}
