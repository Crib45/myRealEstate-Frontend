import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  //test acc email test@test.com pass:123123

  register(user: User) {
    return this.http.post(this.url + "user/register",  user, { responseType: 'text' } );
  }

  save(user: User) {
    return this.http.post(this.url + "user",  user, { responseType: 'text' } );
  }

  getLoggedUser() {
    return this.http.get(this.url + "user/getLoggedUser");
  }

  getById(id:number) {
    return this.http.get(this.url + "user/"+id);
  }


}