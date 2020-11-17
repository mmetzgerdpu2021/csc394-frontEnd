import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ModalChangeStatusData} from '../../../../../../shared/models/modalChangeStatusData';
import {Component, Inject} from '@angular/core';
@Component({
  selector: 'dialog-chang-status',
  templateUrl: 'dialogChangeStatus.html',
})
export class DialogChangeStatus {

  listStatus: string[] = ['To do','In progress','Done'];

  constructor(
    public dialogRef: MatDialogRef<DialogChangeStatus>,
    @Inject(MAT_DIALOG_DATA) public data: ModalChangeStatusData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
