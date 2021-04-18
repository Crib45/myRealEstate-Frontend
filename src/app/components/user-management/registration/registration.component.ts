import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { TelNumber } from 'src/app/models/TelNumber';
import { User } from 'src/app/models/User';
import { CityService } from 'src/app/services/city.service';
import { UserService } from 'src/app/services/user.service';
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

  registryForm: FormGroup = new FormGroup({
    tel: new FormControl(new TelNumber('', '', ''), [Validators.required]),
    cityIndex: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmed: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private _cityService: CityService,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllCities();
    console.log(this.cities)
  }


  /**
   * Returns aray of all cities
   */
  getAllCities(): any {
    this._cityService.getAllCities().subscribe((response: any) => {
      this.cities = response;
    })
  }

  get form() { return this.registryForm.controls; }


  test() {
    console.log(this.registryForm)
  }

  onSubmit() {
    let user = new User(
      this.form.username.value,
      this.form.firstName.value,
      this.form.lastName.value,
      this.form.password.value,
      this.form.email.value,
      this.cities[this.form.cityIndex.value],
      parseInt(this.form.tel.value.area + this.form.tel.value.exchange + this.form.tel.value.subscriber)
    )
    console.log(user)
    this._userService.register(user).subscribe(response => {
      
    })
  }

}
