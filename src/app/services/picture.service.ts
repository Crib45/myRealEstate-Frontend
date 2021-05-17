import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  
  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  save(picture: any) {
    return this.http.post(this.url + "pictures",  picture, { responseType: 'text' } );
  }

  getByUserId(userId: number) {
    return this.http.get(this.url + "pictures/getByUserId/"+ userId);
  }

  saveByLogged(picture: any) {
    return this.http.post(this.url + "pictures/loggedUserPic",  picture, { responseType: 'text' } );
  }
}
