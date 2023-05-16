import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/User';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
    private matDialogRef: MatDialogRef<DeleteUserDialogComponent>) {

  }

  public returnResult(confirmDelete: boolean) {
      this.matDialogRef.close({ confirmDelete: confirmDelete, userId: this.data.id });
  }

}
