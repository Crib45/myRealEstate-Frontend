import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any, 
    private dialogRef: MatDialogRef<NotificationsComponent>,) { }

  ngOnInit(): void {
  }

}
