import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileCommentsService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  save(profileComments: any) {
    return this.http.post(this.url + "profileComments",  profileComments );
  }

  getCommentedOn(userId: number) {
    return this.http.get(this.url + "profileComments/commentedOn/"+userId );
  }
}
