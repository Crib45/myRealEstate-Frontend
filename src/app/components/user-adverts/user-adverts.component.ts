import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AdvertEditComponent } from '../modals/advert-edit/advert-edit.component';

@Component({
  selector: 'app-user-adverts',
  templateUrl: './user-adverts.component.html',
  styleUrls: ['./user-adverts.component.css']
})
export class UserAdvertsComponent implements OnInit {

  columnsToDisplay: string[] = ['title','price','createdAt','expiresAt','edit','delete'];
  advertData = [];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
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

}
