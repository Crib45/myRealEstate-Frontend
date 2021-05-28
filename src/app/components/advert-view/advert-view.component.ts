import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { Advertisement } from 'src/app/models/Advertisement';
import { AdvertisementPictureService } from 'src/app/services/advertisement-picture.service';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ProfileEditComponent } from '../user-management/profile-edit/profile-edit.component';

@Component({
  selector: 'app-advert-view',
  templateUrl: './advert-view.component.html',
  styleUrls: ['./advert-view.component.css']
})
export class AdvertViewComponent implements OnInit {

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  id: number | null = null;
  private sub: any;
  advertisement: Advertisement = new Advertisement();
  pictures: any[] = [];
  utilities: any[] = [];

  constructor( 
    private route: ActivatedRoute,
    private _advertisementService: AdvertisementService,
    private _advertisementPictureService: AdvertisementPictureService,
    private dialog: MatDialog,
    private _utilityService: UtilityService
    ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.getAdvertById();
      this.getPictures();
      this.getUtilsByAdvertId(this.id);
   });
  }

  getAdvertById() {
    if(this.id !== null){
      this._advertisementService.getById(this.id).subscribe((response: any) => {
        this.advertisement = response;
      })
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getPictures(){
    if(this.id !== null) {
      this._advertisementPictureService.getAllByAdvertId(this.id).subscribe((response:any) => {
        this.pictures = response;
        this.pictures.forEach(element => {
          element.pictureBlob = "data:" + element.contentType +";base64,"+ element.fileData;
        });
      })
    }
  }

  goNextPic() {
    this.carousel?.next();
  }

  goPreviousPic() {
    this.carousel?.prev();
  }

  getUtilsByAdvertId(advertId: number) {
    this._utilityService.getAllByAdvertId(advertId).subscribe((response: any) => {
      this.utilities = response;
    })
  }

  openUserInfo() {
    console.log('asd')
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      mode:'info',
      userId: this.advertisement.owner.id
    }
    dialogConfig.width = "550px";
    dialogConfig.minHeight = "500px";
    const dialogRef = this.dialog.open(ProfileEditComponent, dialogConfig);
  }

}
