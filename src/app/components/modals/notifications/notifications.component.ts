import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SavedFilterService } from 'src/app/services/saved-filter.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';
import { ProfileEditComponent } from '../../user-management/profile-edit/profile-edit.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private dialogRef: MatDialogRef<NotificationsComponent>,
    private _subcategoryService: SubcategoryService,
    private _savedFilterService: SavedFilterService,
    private dialog: MatDialog,
    public router: Router,
    private _notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.getAllNotifications();
  }

  /**
   * Return all notifications
   */
  getAllNotifications() {
    this._notificationService.getAll().subscribe((response: any) => {
      this.notifications = response;
    })
  }

  /**
   * Redirect user to where notification is pointing
   */
  openNotification(notification: any) {
    console.log(notification)
    if(notification.notificationType == 'SavedFilter') {
      this.savedFilterAction(notification);
    }
    else if(notification.notificationType == 'OwnedAdvert' ) {
      this.ownedAdvertAction(notification);
    }
    else if(notification.notificationType == 'FavoriteAd') {
      this.favoriteAdAction(notification);
    }
    else if(notification.notificationType == 'ProfileComments') {
      this.profileCommentAction();
    }
  }

  savedFilterAction(notification: any) {
    this._subcategoryService.searchSize = notification.savedFilter.maxSize; 
    this._subcategoryService.searchPrice = notification.savedFilter.maxPrice; 
    this._savedFilterService.save(notification.savedFilter).subscribe(response => {
    })
    if(notification.savedFilter.category) {
      this.router.navigate(['/category', notification.savedFilter.category.title]);
    }
    this.dialogRef.close();
  }

  ownedAdvertAction(notification: any) {
    this.dialogRef.close();
    this.router.navigate(['/advert', notification.advertisement.id]);
  }

  favoriteAdAction(notification: any) {
    this.dialogRef.close();
    this.router.navigate(['/advert', notification.favoriteAd.advertisement.id]);
  }

  profileCommentAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      mode:'edit',
      userId: null
    }
    dialogConfig.width = "550px";
    dialogConfig.minHeight = "500px";
    const dialogRefNew = this.dialog.open(ProfileEditComponent, dialogConfig);
    this.dialogRef.close();
  }

}
