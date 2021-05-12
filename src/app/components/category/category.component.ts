import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  private categoryTitle: string | null = "";

  subcategories: any[] = [];

  maxPrice: number = 0;
  minSize: number = 0;
  maxSize: number = 0;
  titleSearch: String = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _subcategoryService: SubcategoryService,
    private _advertisementService: AdvertisementService
  ) { }

  ngOnInit(): void {
    this.setCategoryFromParam();
    if (!this.categoryTitle || this.categoryTitle == "") {
      this.router.navigate(['']);
    }
    else this.getSubCategoriesByCategoryTitle(this.categoryTitle);
  }

  setCategoryFromParam() {
    const routeParams = this.route.snapshot.paramMap;
    this.categoryTitle = routeParams.get('title');
  }

  getSubCategoriesByCategoryTitle(title: string) {
    this._subcategoryService.getSubCategoriesByCategoryTitle(title).subscribe((response:any) => {
      this.subcategories = response;
      if(this.subcategories && this.subcategories.length > 0) {
        this.getAdvertisementsBySubCategoryId(this.subcategories[0].id)
      }
    })
  }

  getAdvertisementsBySubCategoryId(subcategoryId: Number) {
    this._advertisementService.getAllPublishedBySubCategoryId(subcategoryId).subscribe((response:any) => {
      
    })
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k€';
    }

    return value;
  }

}
