import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Advertisement } from 'src/app/models/Advertisement';
import { AdvertisementDTO } from 'src/app/models/AdvertisementDTO';
import { AdvertisementPictureService } from 'src/app/services/advertisement-picture.service';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { FavoriteAdService } from 'src/app/services/favorite-ad.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categoryTitle: string | null = "";

  subcategories: any[] = [];
  advertisements: AdvertisementDTO[] = [];

  maxPrice: number = 0;
  minSize: number = 0;
  maxSize: number = 0;
  titleSearch: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _subcategoryService: SubcategoryService,
    private _advertisementService: AdvertisementService,
    private _advertPictureService: AdvertisementPictureService,
    private _favoriteAd: FavoriteAdService,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.setCategoryFromParam();
    if (!this.categoryTitle || this.categoryTitle == "") {
      this.router.navigate(['']);
    }
    else {
      this.getSubCategoriesByCategoryTitle(this.categoryTitle);
      this.maxPrice = this._subcategoryService.searchPrice;
      this.maxSize = this._subcategoryService.searchSize;
      this._subcategoryService.searchPrice = 0;
      this._subcategoryService.searchSize = 0;
    }
     
  }

  /**
   * Sets category from params
   */
  setCategoryFromParam() {
    const routeParams = this.route.snapshot.paramMap;
    this.categoryTitle = routeParams.get('title');
  }

  /**
   * Gets subcategories by category title
   * @param title Title of category
   */
  getSubCategoriesByCategoryTitle(title: string) {
    this._subcategoryService.getSubCategoriesByCategoryTitle(title).subscribe((response:any) => {
      this.subcategories = response;
    })
  }

  /**
   * Gets advertisements by subcategory id
   * @param subcategoryId 
   */
  getAdvertisementsBySubCategoryId(subcategoryId: Number) {
    this._advertisementService.getAllPublishedBySubCategoryId(subcategoryId).subscribe((response:any) => {
      this.advertisements = response;
      this.advertisements.forEach(element => {
        element.primaryPic = null;
        if(element.advertisementPicture){
          element.primaryPic = "data:" + element.advertisementPicture.contentType +";base64,"+ element.advertisementPicture.fileData;
        }
      });
    })
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k€';
    }
    return value;
  }

  /**
   * Event to get advertisements by chosen subcategory tab
   * @param tabChangeEvent 
   */
  onTabChange(tabChangeEvent: MatTabChangeEvent) {
    if(this.subcategories[tabChangeEvent.index])
      this.getAdvertisementsBySubCategoryId(this.subcategories[tabChangeEvent.index].id);
  }

  getPrimaryPicture(advertisement: any) {
    if(advertisement && advertisement.id) {
      this._advertPictureService.getPrimaryByAdvertisementId(advertisement.id).subscribe((response:any) => {
        if(response && response.contentType && response.fileData) {
          advertisement.primaryPic = "data:" + response.contentType +";base64,"+ response.fileData;
        }
      })
    }
  }

  /**
   * Sets advert as favorite
   * @param advertisementDTO 
   */
  setFavorite(advertisementDTO: AdvertisementDTO) {
    if(!this._authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    else {
      this._favoriteAd.saveFavorite(advertisementDTO.advertisement).subscribe(response => {
        advertisementDTO.favoriteAd = response;
      })
    }
  }

  /**
   * Removes FavoriteAd by id
   * @param advertisementDTO 
   */
  removeFavorite(advertisementDTO: AdvertisementDTO) {
    this._favoriteAd.delete(advertisementDTO.favoriteAd.id).subscribe(response => {
      if(response == "Success")
        advertisementDTO.favoriteAd = null;
    })
  }

  resetFilters() {
    this.maxPrice = 0;
    this.minSize = 0;
    this.maxSize = 0;
    this.titleSearch= '';
  }
}
