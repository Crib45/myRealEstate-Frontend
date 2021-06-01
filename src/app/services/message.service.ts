import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  sendTo: any = null;

  getAllForLogged() {
    return this.http.get(this.url + "messages/getAllForLogged" )
  }

  save(message:any) {
    return this.http.post(this.url + "messages", message)
  }

  markAsSeen(messages:any) {
    return this.http.put(this.url + "messages/markAsSeen", messages, { responseType: 'text' })
  }
}
