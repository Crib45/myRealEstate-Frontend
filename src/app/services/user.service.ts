import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  //test acc email test@test.com pass:123123

  register(user: User) {
    return this.http.post(this.url + "user/register",  user );
  }


}