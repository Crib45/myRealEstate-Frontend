import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileEditComponent } from '../../user-management/profile-edit/profile-edit.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public _authService: AuthService,
    private dialog: MatDialog,
    private router: Router,) { }

  ngOnInit(): void {
  }

  goHomePage() {
    this.router.navigate(['']);
  }

  openProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
    }
    dialogConfig.minWidth = "500px";
    const dialogRef = this.dialog.open(ProfileEditComponent, dialogConfig);
  }

}
