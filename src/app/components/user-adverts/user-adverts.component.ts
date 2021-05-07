import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Advertisement } from 'src/app/models/Advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AdvertEditComponent } from '../modals/advert-edit/advert-edit.component';

@Component({
  selector: 'app-user-adverts',
  templateUrl: './user-adverts.component.html',
  styleUrls: ['./user-adverts.component.css']
})
export class UserAdvertsComponent implements OnInit {

  columnsToDisplay: string[] = ['title','price','createdAt','expiresAt','edit','delete'];
  advertData: Advertisement[] = [];

  constructor(
    private dialog: MatDialog,
    private _advertisementService: AdvertisementService
    ) { }

  ngOnInit(): void {
    this.getOwnedAdvertisements();
  }

  createAdvert() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      mode: 'create'
    }
    dialogConfig.autoFocus = false;
    dialogConfig.minWidth = "50%";
    this.dialog.open(AdvertEditComponent, dialogConfig);
  }

  getOwnedAdvertisements() {
    this._advertisementService.getAllByOwned().subscribe((response: any) => {
        this.advertData = response;
        console.log(this.advertData)
    });
  }

}
