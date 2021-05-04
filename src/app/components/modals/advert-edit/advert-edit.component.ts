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

  firstFormGroup: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    categoryIndex: new FormControl('', [Validators.required]),
    subCategoryIndex: new FormControl('', [Validators.required]),
    size: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  secondFormGroup: FormGroup = new FormGroup({
    description: new FormControl('', [Validators.required]),
    expiryDate: new FormControl('', [Validators.required]),
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
    })
  }

  getAllSubCategoryByCategoryId() {
    this._subCategoryService.getSubCategoriesByCategoryId(this.categories[this.formOne.categoryIndex.value].id).subscribe((response: any) => {
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

      let advertisement: Advertisement = new Advertisement(
        this.formOne.title.value,
        this.formOne.title.value,
        this.formOne.price.value,
        this.formOne.size.value,
        {
          size: this.formOne.size.value,
          city: this.cities[this.formTwo.cityIndex.value],
          subCategory: this.subCategories[this.formOne.subCategoryIndex.value]
        }
      );
      // let advertisement: Advertisement = new Advertisement(
      //   'ime',
      //   'opis',
      //   123123,
      //   424242,
      //   null
      // )
      console.log(advertisement)
      this._advertisementService.save(advertisement).subscribe(response => {
        
      })
    }

}
