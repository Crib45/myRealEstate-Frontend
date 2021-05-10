import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdvertisementPictureService } from 'src/app/services/advertisement-picture.service';
import { AdvertisementService } from 'src/app/services/advertisement.service';

@Component({
  selector: 'app-advert-pictures',
  templateUrl: './advert-pictures.component.html',
  styleUrls: ['./advert-pictures.component.css']
})
export class AdvertPicturesComponent implements OnInit {

  advertisementId!: Number;

  pictures: any[] = [];
  selectedPicture: any = null;
  selectedData: any = null;

  constructor(
    private _advertisementService: AdvertisementService,
    private _advertisementPictureService: AdvertisementPictureService,
    private dialogRef: MatDialogRef<AdvertPicturesComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) { 
    this.advertisementId = data.advertId;
    this.getPictures();
  }

  ngOnInit(): void {
  }

  deletePicture() {
    this.selectedPicture = null;
    this.selectedData = null;
    if(this.selectedData){
      this._advertisementPictureService.delete(this.selectedData.id).subscribe(response => {
        this.getPictures();
      });
    }
  }

  getPictures() {
    this._advertisementPictureService.getAllByAdvertId(this.advertisementId).subscribe((response: any) => {
      this.pictures = response;
      this.pictures.forEach(element => {
        element.pictureBlob = "data:" + element.contentType +";base64,"+ element.fileData;
      });
      console.log(this.pictures)
    })
  }

  savePicture() {
    let file: FormData = new FormData;
    file.append("file",this.selectedPicture.file)
    this._advertisementPictureService.save(file, this.advertisementId).subscribe(response => {

    });
  }

  onUploadClick(event:any) {
    if (event && event.target)
      event.target.value = null;
  }

  onChangeFile(event:any) {
    if (event.target.files.length > 0 && event.target.files[0]) {
      this.selectedPicture = {};
      const file: File = event.target.files[0];
      this.selectedPicture.file = file;
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (_event) => {
        this.selectedPicture.picture = reader.result;
      }
    }
  }
}
