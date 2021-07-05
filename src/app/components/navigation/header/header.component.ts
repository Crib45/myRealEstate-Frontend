import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { FavoriteFiltersComponent } from '../../modals/favorite-filters/favorite-filters.component';
import { NotificationsComponent } from '../../modals/notifications/notifications.component';
import { ProfileEditComponent } from '../../user-management/profile-edit/profile-edit.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  numOfNotSeenMsgs: number = 0;
  numOfNotifications: number = 0;
  interval = interval(60000);

  private messageSub: any;
  private notificationSub: any;

  constructor(
    public authService: AuthService,
    private messageService: MessageService,
    private notificationService: NotificationsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.getNotSeenMessagesNumber();
    this.getNumberOfNotifications();
    this.messageSub = this.interval.subscribe(val => {
      this.getNumberOfNotifications();
      this.getNotSeenMessagesNumber();
    })
  }

  goHomePage() {
    this.router.navigate(['']);
  }

  openProfile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      mode:'edit',
      userId: null
    }
    dialogConfig.width = "550px";
    dialogConfig.minHeight = "500px";
    const dialogRef = this.dialog.open(ProfileEditComponent, dialogConfig);
  }

  openFavsAndFilters() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
    }
    dialogConfig.width = "650px";
    const dialogRef = this.dialog.open(FavoriteFiltersComponent, dialogConfig);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['']);
    this.snackBar.open('Uspešan logout sa sistema', '', {
      duration: 3000,
    });
  }

  getNotSeenMessagesNumber() {
    if(this.authService.isLoggedIn())
    this.messageService.getNotSeenNum().subscribe((response: any) => {
      this.numOfNotSeenMsgs = response;
    })
  }

  getNumberOfNotifications() {
    if(this.authService.isLoggedIn())
    this.notificationService.getNumber().subscribe((response: any) => {
      this.numOfNotifications = response;
    })
  }

  openNotifications() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "450px";
    const dialogRef = this.dialog.open(NotificationsComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
    this.notificationSub.unsubscribe();
  }
}
