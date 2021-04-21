import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let user: any = {
      email: this.form.email.value,
      password: this.form.password.value
    }
    this._authService.login(user).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.form.email.value + ':' + this.form.password.value)
        );
        this.openSnackBar("Uspešno logovanje", "Zatvori");
        let headers:HttpHeaders = this._authService.getHeaders;
        this._userService.getLoggedUser(headers).subscribe(response => {

        })
        this.router.navigate(['']);
      } else {
        this.openSnackBar("Pogrešna lozinka ili email", "Zatvori");
        this.form.email.setValue('');
        this.form.password.setValue('');
      }
    });
  }

  get form() { return this.loginForm.controls; }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
