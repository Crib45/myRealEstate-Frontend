import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Advertisement } from 'src/app/models/Advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AdvertEditComponent } from '../modals/advert-edit/advert-edit.component';
import { AdvertPicturesComponent } from '../modals/advert-pictures/advert-pictures.component';
import { ConfirmationDialogComponent } from '../modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-adverts',
  templateUrl: './user-adverts.component.html',
  styleUrls: ['./user-adverts.component.css']
})
export class UserAdvertsComponent implements OnInit {

  columnsToDisplay: string[] = ['title','price','createdAt','expiresAt','edit','additionalInfo','pictures','delete','publish'];
  advertData: Advertisement[] = [];

  constructor(
    private dialog: MatDialog,
    private _advertisementService: AdvertisementService,
    private snackBar: MatSnackBar
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
    const dialogRef = this.dialog.open(AdvertEditComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((response:any) => {
      if(response) {
        this.getOwnedAdvertisements();
        this.snackBar.open('Uspešno napravljen oglas', 'Fechar', {
          duration: 5000,
        });
      }
    })
  }

  getOwnedAdvertisements() {
    this._advertisementService.getAllByOwned().subscribe((response: any) => {
        this.advertData = response;
    });
  }

  openDeleteConfirmation(advertId: Number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Da li ste sigurni da želite da obrišete oglas?',
        buttonText: {
          ok: 'Obriši',
          cancel: 'Otkaži'
        }
      }
    });
    const snack = this.snackBar.open('Obrisan oglas ne možete vratiti');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      snack.dismiss();
      if (confirmed) {
        this._advertisementService.delete(advertId).subscribe(response => {
          this.snackBar.open('Uspešno obrisan oglas', undefined, {
            duration: 2000,
          });
          this.getOwnedAdvertisements();
        })
      }
    });
  }

  publishAdvert(advertisement: Advertisement) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Da li ste sigurni da želite da objavite oglas?',
        buttonText: {
          ok: 'Potvrdi',
          cancel: 'Otkaži'
        }
      }
    });
    const snack = this.snackBar.open('Ova akcija se ne možе poništiti');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      snack.dismiss();
      if (confirmed) {
        this._advertisementService.publish(advertisement.id!).subscribe(response => {
          this.snackBar.open('Uspešno objavljen oglas', undefined, {
            duration: 2000,
          });
          this.getOwnedAdvertisements();
        })
      }
    });
  }

  openPictures(advertisement: Advertisement) {
    console.log(advertisement)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
     advertId: advertisement.id
    }
    dialogConfig.minWidth = "50%";
    const dialogRef = this.dialog.open(AdvertPicturesComponent, dialogConfig);
  }
}
