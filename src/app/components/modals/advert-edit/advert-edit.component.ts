import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Advertisement } from 'src/app/models/Advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { CategoryService } from 'src/app/services/category.service';
import { CityService } from 'src/app/services/city.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-advert-edit',
  templateUrl: './advert-edit.component.html',
  styleUrls: ['./advert-edit.component.css']
})
export class AdvertEditComponent implements OnInit {

  categories: any[] = [];
  subCategories: any[] = [];
  cities: any[] = [];
  isLinear: boolean = true;
  mode: string = '';
  editAdvertisement: Advertisement;

  firstFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    categoryIndex: new FormControl('', [Validators.required]),
    subCategoryIndex: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  secondFormGroup: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
    expireDate: new FormControl('', [Validators.required]),
    cityIndex: new FormControl('', [Validators.required]),
  });

  constructor(
    private _categoryService: CategoryService,
    private _subCategoryService: SubcategoryService,
    private _cityService: CityService,
    private _advertisementService: AdvertisementService,
    private dialogRef: MatDialogRef<AdvertEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.mode = data.mode;
    this.editAdvertisement = data.advertisement;
    if(this.mode == 'edit' && data.advertisement) {
      this.formOne.title.setValue(data.advertisement.title);
      this.formOne.size.setValue(data.advertisement.estate.size);
      this.formOne.categoryIndex.setValue(data.advertisement.estate.subCategory.category);
      this.formOne.subCategoryIndex.setValue(data.advertisement.estate.subCategory);
      this.formOne.price.setValue(data.advertisement.price);
      this.formTwo.cityIndex.setValue(data.advertisement.estate.city);
      this.formTwo.expireDate.setValue(new Date(data.advertisement.expireDate));
      this.formTwo.description.setValue(data.advertisement.description);
    }
  }

  ngOnInit(): void {
    this.getCategories();
    this.subscribeToCategory();
    this.getAllCities();
  }

  close() {
    this.dialogRef.close();
  }

  get formOne() { return this.firstFormGroup.controls; }

  get formTwo() { return this.secondFormGroup.controls; }

  getCategories() {
    this._categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response;
      if(this.mode == 'edit' && this.editAdvertisement) {
        this.getAllSubCategoryByCategoryId();
      }
    })
  }

  getAllSubCategoryByCategoryId() {
    let categoryId = this.formOne.categoryIndex.value.id;
    this._subCategoryService.getSubCategoriesByCategoryId(categoryId).subscribe((response: any) => {
      this.subCategories = response;
    });
  }

  subscribeToCategory() {
    this.firstFormGroup.get("categoryIndex")?.valueChanges.subscribe(selectedValue => {
      this.formOne.subCategoryIndex.setValue('');
      this.getAllSubCategoryByCategoryId();
    })
  }

  /**
   * Returns aray of all cities
   */
     getAllCities(): any {
      this._cityService.getAllCities().subscribe((response: any) => {
        this.cities = response;
      })
    }

    saveAdvert() {
      let advertisement: Advertisement = new Advertisement();
      if(this.mode == 'edit') {
        advertisement.id = this.editAdvertisement.id;
      }
      advertisement.title = this.formOne.title.value;
      advertisement.description = this.formTwo.description.value,
      advertisement.finished = false;
      advertisement.price = this.formOne.price.value;
      advertisement.expireDate = (<Date>this.formTwo.expireDate.value).getTime();
      advertisement.estate = {
        size: this.formOne.size.value,
        city: this.formTwo.cityIndex.value,
        subCategory: this.formOne.subCategoryIndex.value
      };
      this._advertisementService.save(advertisement).subscribe(response => {
        this.dialogRef.close(true);
      })
    }

    public objectComparisonFunction = function( option: any, value: any ) : boolean {
      return option.id === value.id;
    }

}
