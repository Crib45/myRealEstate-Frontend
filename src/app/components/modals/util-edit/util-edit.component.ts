import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-util-edit',
  templateUrl: './util-edit.component.html',
  styleUrls: ['./util-edit.component.css']
})
export class UtilEditComponent implements OnInit {

  advertId?: number;
  utilities: any[] = []

  constructor(
    private dialogRef: MatDialogRef<UtilEditComponent>,
    private _utilityService: UtilityService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) { 
    this.advertId = data.advertId;
  }

  ngOnInit(): void {
    if(this.advertId !== null && this.advertId !== undefined) {
      this.getUtilsByAdvertId(this.advertId);
    }
  }

  getUtilsByAdvertId(advertId: number) {
    this._utilityService.getAllByAdvertId(advertId).subscribe((response: any) => {
      this.utilities = response;
    })
  }

  save() {
    this._utilityService.save(this.utilities).subscribe( (response: string) => {
      this.closeModal();
    })
  }

  closeModal() {
    this.dialogRef.close();
  }

}
