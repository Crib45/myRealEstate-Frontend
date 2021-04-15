import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { TelNumber } from 'src/app/models/TelNumber';
import { CityService } from 'src/app/services/city.service';
import { TelephoneInputComponent } from '../telephone-input/telephone-input.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: TelephoneInputComponent }
  ]
})
export class RegistrationComponent implements OnInit {

  hide: boolean = true;
  hideConfirm: boolean = true;

  selectedCityIndex!: Number;
  cities: any = [];

  form: FormGroup = new FormGroup({
    tel: new FormControl(new TelNumber('', '', '')),
    cityIndex: new FormControl()
  });

  constructor(private _cityService: CityService) { }

  ngOnInit(): void {
    this.getAllCities();
  }


  getAllCities() {
    this._cityService.getAllCities().subscribe((response:any) => {
      this.cities = response;
    })
  }

}
