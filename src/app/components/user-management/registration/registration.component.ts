import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { TelNumber } from 'src/app/models/TelNumber';
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

  form: FormGroup = new FormGroup({
    tel: new FormControl(new TelNumber('', '', ''))
  });

  constructor() { }

  ngOnInit(): void {
  }

  test() {
    console.log(this.form.get('tel')?.value)
  }

}
