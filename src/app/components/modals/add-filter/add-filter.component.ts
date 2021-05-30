import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SavedFilterService } from 'src/app/services/saved-filter.service';

@Component({
  selector: 'app-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.css']
})
export class AddFilterComponent implements OnInit {

  categories: any[] = [];

  maxSize: number = 0;
  maxPrice: number = 0;
  selectedCategory: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddFilterComponent>,
    private _categoryService: CategoryService,
    private _savedFilterService: SavedFilterService
  ) { }

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

  objectComparisonFunction( option: any, value: any ) : boolean {
    if(!value) {
      return false;
    }
    return option.id === value.id;
  }

  save() {
    let newSavedFilter: any = {
      maxSize: this.maxSize,
      maxPrice: this.maxPrice,
      category: this.selectedCategory
    }
    this._savedFilterService.save(newSavedFilter).subscribe(response => {
      this.dialogRef.close();
    })
  }

}
