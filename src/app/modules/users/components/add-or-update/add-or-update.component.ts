import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';

import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { UsersListService } from '../users-list/users-list.service';
import { AddOrUpdateService } from './add-or-update.service';
import { AddOrUpdateMode } from './add-or-update-mode.enum';
import { User } from '../../models/User';


@Component({
  selector: 'app-add-or-update',
  templateUrl: './add-or-update.component.html',
  styleUrls: ['./add-or-update.component.scss']
})
export class AddOrUpdateComponent {

  public mode: AddOrUpdateMode = AddOrUpdateMode.Add;  
  public loading = false;

  public form: FormGroup = new FormGroup({    
    cpf: new FormControl('', [Validators.required, Validators.minLength(11)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    maritalStatus: new FormControl('', [Validators.required]),    
    profession: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),    
    city: new FormControl('', [Validators.required]),    
  });

  private editUserId = 0;

  public constructor(    
    private addOrUpdateService: AddOrUpdateService,
    private usersListService: UsersListService,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,    
    private dialog: MatDialog,
    private router: Router,
  ) {
    this.setMode();
  }

  public cancel() {
    this.router.navigate(['/users/list']);
  }

  public save() {
    
    const userData: User = {      
      maritalStatus: this.form.get('maritalStatus')?.value,
      birth: new Date(this.form.get('birth')?.value),      
      profession: this.form.get('profession')?.value,
      state: this.form.get('state')?.value,      
      email: this.form.get('email')?.value,
      name: this.form.get('name')?.value,        
      city: this.form.get('city')?.value,
      cpf: this.form.get('cpf')?.value,    
      password: '',
      id: 0,
    };

    if(this.mode == AddOrUpdateMode.Add) {
      this.addUser(userData);
    }
    else {
      this.updateUser(userData);
    }    
  }

  private setMode() {

    this.mode = this.addOrUpdateService.mode;
    
    if(this.mode == AddOrUpdateMode.Update) {
      this.form.setValue({
        maritalStatus: this.addOrUpdateService.user?.maritalStatus,
        profession: this.addOrUpdateService.user?.profession,             
        birth: this.addOrUpdateService.user?.birth,        
        state: this.addOrUpdateService.user?.state,
        email: this.addOrUpdateService.user?.email,   
        name: this.addOrUpdateService.user?.name,
        city: this.addOrUpdateService.user?.city,        
        cpf: this.addOrUpdateService.user?.cpf,
      });
      this.editUserId = this.addOrUpdateService.user!.id
    }
    this.addOrUpdateService.mode = AddOrUpdateMode.Add;
    this.addOrUpdateService.user = null;
  }

  private addUser(newUser: User) {

    this.loading = true;
    newUser.password = '1234!',

    this.usersListService.postUser(newUser)
    .pipe(
      catchError(error => {
        this.dialog.open(ErrorDialogComponent, { data: this.translateService.instant('users.add-or-update.error-creating-users') })
        return of([])
      })
    )
    .subscribe(result => {
      this.loading = false;
      this.router.navigate(['/users/list']);
      this.snackBar.open(this.translateService.instant('users.add-or-update.user-created-successfully'), 'Ok', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 4000
      });
    });
  }

  private updateUser(user: User) {

    this.loading = true;
    
    const updateFields = JSON.parse(JSON.stringify(user));
    delete updateFields.password;
    
    this.usersListService.patchUser(this.editUserId, updateFields)
    .pipe(
      catchError(error => {
        this.dialog.open(ErrorDialogComponent, { data: this.translateService.instant('users.add-or-update.error-loading-users') })
        return of([])
      })
    )
    .subscribe(result => {
      this.loading = false;
      this.router.navigate(['/users/list']);
      this.snackBar.open(this.translateService.instant('users.add-or-update.user-updated-successfully'), 'Ok', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 4000
      });
    });
  }

}
