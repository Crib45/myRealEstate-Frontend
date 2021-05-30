import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FavoriteAdService } from 'src/app/services/favorite-ad.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-favorite-filters',
  templateUrl: './favorite-filters.component.html',
  styleUrls: ['./favorite-filters.component.css']
})
export class FavoriteFiltersComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<FavoriteFiltersComponent>,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private _favoriteAdService: FavoriteAdService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getFavorites();
  }

  favoriteAdverts: any[] = [];
  columnsToDisplay: string[] = ['title','expiresAt','delete'];

  openDeleteConfirmation(favAdId: Number) {
    const dialogRefDelete = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Da li ste sigurni da želite da obrišete oglas?',
        buttonText: {
          ok: 'Obriši',
          cancel: 'Otkaži'
        }
      }
    });
    dialogRefDelete.afterClosed().subscribe((confirmed: boolean) => {

    });
  }

  getFavorites() {
    this._favoriteAdService.getAllForLogged().subscribe((response: any) => {
      this.favoriteAdverts = response;
    })
  }

  goToAdvert(advertId:number){
    this.dialogRef.close();
    this.router.navigate(['/advert', advertId]);
  }

}
