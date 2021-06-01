import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap/carousel/carousel';
import { Advertisement } from 'src/app/models/Advertisement';
import { AdvertisementPictureService } from 'src/app/services/advertisement-picture.service';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { UtilityService } from 'src/app/services/utility.service';
import { ProfileEditComponent } from '../user-management/profile-edit/profile-edit.component';
import { interval } from 'rxjs';
import { AdvertCommentsService } from 'src/app/services/advert-comments.service';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteAdService } from 'src/app/services/favorite-ad.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-advert-view',
  templateUrl: './advert-view.component.html',
  styleUrls: ['./advert-view.component.css']
})
export class AdvertViewComponent implements OnInit {

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  id: number | null = null;
  private sub: any;
  private subComments: any;
  advertisement: Advertisement = new Advertisement();
  pictures: any[] = [];
  utilities: any[] = [];
  advertComments: any = [];
  newCommentTxt: string = '';
  //Equal to null if advert isnt favorite and is favorite object if it is
  isFavorite: any = null;
  //1 minute interval
  commentInterval = interval(60000);

  constructor( 
    private route: ActivatedRoute,
    private _advertisementService: AdvertisementService,
    private _advertisementPictureService: AdvertisementPictureService,
    private dialog: MatDialog,
    private _utilityService: UtilityService,
    private _advertCommentsService: AdvertCommentsService,
    public _authService: AuthService,
    private router: Router,
    private _favoriteAdService: FavoriteAdService,
    private _messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
   });
   if(this.id) {
    this.getAdvertById();
    this.subComments = this.commentInterval.subscribe(val => {
      if(this.id)
        this.getAdvertComments(this.id);
    })
   }
  }

  getAdvertById() {
    if(this.id !== null){
      this._advertisementService.getById(this.id).subscribe((response: any) => {
        if(response && this.id !== null){
          this.advertisement = response;
          this.getIsFavorite();
          this.getPictures();
          this.getUtilsByAdvertId(this.id);
          this.getAdvertComments(this.id);
        }
        else this.router.navigate(['']);
      })
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subComments.unsubscribe();
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      mode:'info',
      userId: this.advertisement.owner.id
    }
    dialogConfig.width = "550px";
    dialogConfig.minHeight = "500px";
    const dialogRef = this.dialog.open(ProfileEditComponent, dialogConfig);
  }

  getAdvertComments(advertId:number) {
    this._advertCommentsService.getAllByAdvertId(advertId).subscribe((response: any) => {
      this.advertComments = response;
    })
  }

  saveComment() {
    if(this.newCommentTxt) {
      let newComment = {
        comment: this.newCommentTxt,
        advertisement: this.advertisement
      }
      this._advertCommentsService.save(newComment).subscribe((response:any) => {
        if(response == "Success" && this.id != null) {
          this.getAdvertComments(this.id)
          this.newCommentTxt = '';
        }
      })
    }
  }

   /**
   * Sets advert as favorite
   * @param advertisementDTO 
   */
    setFavorite(advertisement: Advertisement) {
      if(!this._authService.isLoggedIn()) {
        this.router.navigate(['/login']);
      }
      else {
        this._favoriteAdService.saveFavorite(advertisement).subscribe(response => {
          this.isFavorite = response;
        })
      }
    }
  
    /**
     * Removes FavoriteAd by id
     * @param advertisementDTO 
     */
    removeFavorite(favoriteAd: any) {
      if(favoriteAd.id)
      this._favoriteAdService.delete(favoriteAd.id).subscribe(response => {
        if(response == "Success")
          this.isFavorite = null;
      })
    }

    getIsFavorite() {
      if(this.advertisement.id) {
        this._favoriteAdService.getByAdvertIdForLogged(this.advertisement.id).subscribe((response: any) => {
          this.isFavorite = response;
        })
      }
    }

    contactOwner() {
      this._messageService.sendTo = this.advertisement.owner;
      this.router.navigate(['/chat']);
    }

}
