import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { User } from '../../models/User';
import { UsersListService } from './users-list.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';
import { AddOrUpdateService } from '../add-or-update/add-or-update.service';
import { AddOrUpdateMode } from '../add-or-update/add-or-update-mode.enum';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  
  public displayedColumns: string[] = ['actions', 'name', 'birth', 'cpf', 'city'];
  public userLogged: User | null = null;      
  public users: Array<User> = [];
  public loading = true;
  public textFilter = '';
  public pagination: any = {
    pageIndex: 0,
    pageSize: 5,
    pageItems: []
  };

  private timerFilterRefresh: any = null;
  
  public constructor(private authService: AuthService,
    private addOrUpdateService: AddOrUpdateService,
    private usersListService: UsersListService,    
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {       
    this.userLogged = this.authService.getUser();
  }

  public ngOnInit(): void {    
    this.loadUsers();
  }

  public handlePageEvent($event: any) {
    this.pagination.pageIndex = $event.pageIndex;
    this.pagination.pageSize = $event.pageSize;
    this.refreshPage();
  }

  public refreshPage() {    
    
    const indexStart = this.pagination.pageIndex * this.pagination.pageSize;
    const indexEnd = indexStart + this.pagination.pageSize;
    this.pagination.pageItems = this.users.slice(indexStart, indexEnd);

    if(this.textFilter.trim().length > 2) {
      this.pagination.pageItems = this.pagination.pageItems.filter((item: User) => {
        return item.name.toLowerCase().indexOf(this.textFilter.toLowerCase()) > -1;
      });
    }
  }

  public openUserDetailsDialog(user: User) {
    this.dialog.open(UserDetailsDialogComponent, { data: user })
  }

  public editUser(user: User) {
    this.addOrUpdateService.mode = AddOrUpdateMode.Update;
    this.addOrUpdateService.user = user;
    this.router.navigate(['/users/add-or-update']);
  }

  public showDeleteUserDialog(user: User) {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, { data: user })
    dialogRef.afterClosed().subscribe(
      (dialogResult) => {
        if(dialogResult.confirmDelete) {
          this.deleteUser(dialogResult.userId);
        }
      }  
    );
  }

  public requestFilterRefresh() {

    if(this.timerFilterRefresh) {
      clearTimeout(this.timerFilterRefresh);
    }

    this.timerFilterRefresh = setTimeout(() => {
      this.timerFilterRefresh = null;
      this.refreshPage();
    }, 1000);
  }

  private loadUsers() {
    this.usersListService.getUsers()      
    .pipe(                
      catchError(error => {          
        this.dialog.open(ErrorDialogComponent, { data: 'Error loading users.' })
        return of([])
      })
    )
    .subscribe(result => {
      this.loading = false;
      this.users = result;
      this.refreshPage();
    });
  }

  private deleteUser(userId: number) {
    this.loading = true;
    this.usersListService.deleteUser(userId)      
    .pipe(                
      catchError(error => {          
        this.dialog.open(ErrorDialogComponent, { data: 'Error deleting user.' })
        return of([])
      })
    )
    .subscribe(result => {
      this.snackBar.open(this.translateService.instant('users.users-list.user-removed-successfully'), 'Ok', {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 4000
      });
      this.loadUsers();
    });
  }

}
