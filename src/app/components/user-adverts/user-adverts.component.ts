import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Advertisement } from 'src/app/models/Advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AdvertEditComponent } from '../modals/advert-edit/advert-edit.component';
import { ConfirmationDialogComponent } from '../modals/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-adverts',
  templateUrl: './user-adverts.component.html',
  styleUrls: ['./user-adverts.component.css']
})
export class UserAdvertsComponent implements OnInit {

  columnsToDisplay: string[] = ['title','price','createdAt','expiresAt','edit','pictures','delete'];
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
      this.getOwnedAdvertisements();
    })
  }

  getOwnedAdvertisements() {
    this._advertisementService.getAllByOwned().subscribe((response: any) => {
        this.advertData = response;
    });
  }

  openDeleteConfirmation(advertId: Number) {
    console.log(advertId);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Da li ste sigurni da zelite da obrišete oglas?',
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
          this.snackBar.open('Uspešno obrisan oglas', 'Fechar', {
            duration: 2000,
          });
          this.getOwnedAdvertisements();
        })
      }
    });
  }
}
