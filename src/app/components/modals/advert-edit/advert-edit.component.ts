import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-advert-edit',
  templateUrl: './advert-edit.component.html',
  styleUrls: ['./advert-edit.component.css']
})
export class AdvertEditComponent implements OnInit {

  categories: any[] = [];
  subCategories: any[] = [];
  isLinear: boolean = true;
  mode: string = '';
  firstFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    categoryIndex: new FormControl('', [Validators.required]),
    subCategoryIndex: new FormControl('', [Validators.required]),
  });

  constructor(
    private _categoryService: CategoryService,
    private _subCategoryService: SubcategoryService,
    private dialogRef: MatDialogRef<AdvertEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.mode = data.mode;
  }

  ngOnInit(): void {
    this.getCategories();
    this.subscribeToCategory();
  }

  close() {
    this.dialogRef.close();
  }

  get form() { return this.firstFormGroup.controls; }

  getCategories() {
    this._categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response;
    })
  }

  getAllSubCategoryByCategoryId() {
    this._subCategoryService.getSubCategoriesByCategoryId(this.categories[this.form.categoryIndex.value].id).subscribe((response: any) => {
      this.subCategories = response;
    });
  }

  subscribeToCategory() {
    this.firstFormGroup.get("categoryIndex")?.valueChanges.subscribe(selectedValue => {
      this.form.subCategoryIndex.setValue('');
      this.getAllSubCategoryByCategoryId();
    })
  }

}
