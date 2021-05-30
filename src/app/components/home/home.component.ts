import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any[] = [];

  maxSize: number = 0;
  maxPrice: number = 0;
  selectedCategory: any;

  constructor(private _categoryService: CategoryService, 
    private _subcategoryService: SubcategoryService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this._categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response;
      this.categories.forEach(element => {
        element.picture.categoryPicture = "data:" + element.picture.contentType +";base64,"+ element.picture.imgBlob;
      });
    })
  }

  search() {
    if(this.maxSize) {
      this._subcategoryService.searchSize = this.maxSize; 
    }
    if(this.maxPrice) {
      this._subcategoryService.searchPrice = this.maxPrice; 
    }
    if(this.selectedCategory) {
      this.router.navigate(['/category', this.selectedCategory.title]);
    }
  }

  objectComparisonFunction( option: any, value: any ) : boolean {
    if(!value) {
      return false;
    }
    return option.id === value.id;
  }

}
