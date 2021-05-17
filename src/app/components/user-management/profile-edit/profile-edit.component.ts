import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CityService } from 'src/app/services/city.service';
import { PictureService } from 'src/app/services/picture.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  mode: string = '';
  userId?: number;
  user: any = {};
  cities: any[] = [];
  selectedPicture: any;
  pictureChanged:boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ProfileEditComponent>,
    private _userService: UserService,
    private _pictureService: PictureService,
    private snackBar: MatSnackBar,
    private _cityService: CityService,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.mode = data.mode;
      if(this.mode == 'info') {
        this.userId = data.userId;
      }
     }

  ngOnInit(): void {
    this.getAllCities();
    if(this.mode == 'edit') {
      this.getLogged();
    }
    else if(this.mode='info') {

    }

  }

  getLogged() {
    this._userService.getLoggedUser().subscribe(response => {
      this.user = response;
      this.user.createdAt = new Date(this.user.createdAt);
      this.getProfilePicture(this.user.id);
    })
  }

  getById(id:number) {
    this._userService.getById(id).subscribe(response => {
      this.user = response;
      this.user.createdAt = new Date(this.user.createdAt);
      this.getProfilePicture(this.user.id);
    })
  }

  getAllCities(): any {
    this._cityService.getAllCities().subscribe((response: any) => {
      this.cities = response;
    })
  }

  public objectComparisonFunction = function( option: any, value: any ) : boolean {
    if(!value) {
      return false;
    }
    return option.id === value.id;
  }

  saveUser() {
    this.savePicture();
    this._userService.save(this.user).subscribe(response => {
      this.snackBar.open('Uspešno promenjeni podaci', undefined, {
        duration: 2000,
      });
      this.dialogRef.close();
    })
  }

  uploadPicture() {
    
  }

  savePicture() {
    if(this.pictureChanged) {
      let file: FormData = new FormData;
      file.append("file",this.selectedPicture.file)
      this._pictureService.saveByLogged(file).subscribe(response => {
      });
    }
  }

  getProfilePicture(userId: number) {
    if(userId == 0 || userId){
      this._pictureService.getByUserId(userId).subscribe((response:any) => {
        if(response && response.contentType && response.imgBlob && response.id){
          this.selectedPicture = {}
          this.selectedPicture.picture = "data:" + response.contentType +";base64,"+ response.imgBlob;
          this.selectedPicture.pictureId = response.id;
        }
      });
    }
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
        this.pictureChanged = true;
        console.log(this.selectedPicture)
      }
    }
  }
}
