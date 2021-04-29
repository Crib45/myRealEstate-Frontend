import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories: any[] = [];

  constructor(private _categoryService: CategoryService) { }

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

}
