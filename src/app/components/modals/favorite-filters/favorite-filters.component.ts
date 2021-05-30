import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FavoriteAdService } from 'src/app/services/favorite-ad.service';
import { SavedFilterService } from 'src/app/services/saved-filter.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { AddFilterComponent } from '../add-filter/add-filter.component';
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
    private _savedFilterService: SavedFilterService,
    private _subcategoryService: SubcategoryService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.router.navigate(['']);
    this.getFavorites();
    this.getSavedFilters();
  }

  favoriteAdverts: any[] = [];
  filters: any[] = [];
  columnsToDisplay: string[] = ['title', 'expiresAt', 'delete'];
  columnsToDisplayFilters: string[] = ['category', 'maxSize', 'maxPrice','goTo','deleteFilter'];

  openDeleteConfirmation(favAdId: number) {
    const dialogRefDelete = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Da li ste sigurni da želite da uklonite oglas iz praćenih?',
        buttonText: {
          ok: 'Obriši',
          cancel: 'Otkaži'
        }
      }
    });
    dialogRefDelete.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.removeFavorite(favAdId);
      }
    });
  }

  getFavorites() {
    this._favoriteAdService.getAllForLogged().subscribe((response: any) => {
      this.favoriteAdverts = response;
    })
  }

  goToAdvert(advertId: number) {
    this.dialogRef.close();
    this.router.navigate(['/advert', advertId]);
  }

  /**
 * Removes FavoriteAd by id
 * @param advertisementDTO 
 */
  removeFavorite(favoriteAdId: number) {
    this._favoriteAdService.delete(favoriteAdId).subscribe(response => {
      if (response == "Success")
        this.getFavorites();
      this.snackBar.open('Uspešno uklonjen oglas', '', {
        duration: 3000,
      });
    })
  }

  createNewFilter() {
    const dialogConfigFilter = new MatDialogConfig();
    dialogConfigFilter.data = {
    }
    dialogConfigFilter.width = "300px";
    const dialogRef = this.dialog.open(AddFilterComponent, dialogConfigFilter);
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      this.getSavedFilters();
      this.snackBar.open('Uspešno kreiran filter', '', {
        duration: 3000,
      });
    });
  }

  getSavedFilters() {
    this._savedFilterService.getAllForLogged().subscribe((response: any) => {
      this.filters = response;
    })
  }

  deleteSavedFilter(savedFilterId:Number) {
    this._savedFilterService.delete(savedFilterId).subscribe(response => {
      this.getSavedFilters();
      this.snackBar.open('Uspešno uklonjen filter', '', {
        duration: 3000,
      });
    })
  }

  goToSearch(savedFilter: any) {
    this._subcategoryService.searchSize = savedFilter.maxSize; 
    this._subcategoryService.searchPrice = savedFilter.maxPrice; 
    if(savedFilter.category) {
      this.router.navigate(['/category', savedFilter.category.title]);
    }
    this.dialogRef.close();
  }
}
