import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementPictureService {

  url = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  delete(id: Number) {
    return this.http.delete(this.url + "advertisementPictures/"+id,{ responseType: 'text' });
  }

  save(file: any, advertisementId: Number) {
    return this.http.post(this.url + "advertisementPictures/"+advertisementId,  file ,{ responseType: 'text' });
  }

  getAllByAdvertId(id: Number) {
    return this.http.get(this.url + "advertisementPictures/getAllByAdvertisementId/"+id);
  }

  setPrimary(advertisementId: Number,id: Number) {
    return this.http.put(this.url + "advertisementPictures/setPrimary/"+advertisementId+"/"+id,{});
  }
}
