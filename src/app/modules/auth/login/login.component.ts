import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { LoginService } from './login.service';
import { User } from '../../users/models/User';
import { AuthService } from '../auth.service';
import { tap, catchError, throwError, delay  } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loading = false;
  public loginFailed = false;
  public form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
  });

  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  public constructor(private loginService: LoginService,
    private translateService: TranslateService,    
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) {

  }


  public submit() {
    
    if (this.form.valid) {

      this.loading = true;
      this.loginFailed = false;

      const _email: string = this.form.get('email')?.value;
      const _password: string = this.form.get('password')?.value;

      this.loginService.login(_email, _password).pipe(
        delay(600),
        tap((result: Array<User>) => {          
          this.loading = false;
          this.authService.setUser(result.length > 0 ? result[0] : null);
          if(this.authService.isAuthenticated()) {
            this.keepUserDataOnlyForTesting();
            this.router.navigate(['/users/list']);
            this.snackBar.open(`${this.translateService.instant('login.welcome')} ${result[0].name}`, 'Ok', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 4000
            });  
          }
          else {
            this.loginFailed = true;
          }                    
        }),
        catchError((error) => {
          this.loading = false;
          this.loginFailed = true;          
          this.dialog.open(ErrorDialogComponent, { data: this.translateService.instant('login.unexpected-error') })     
          return throwError(() => error);
        })
      )
      .subscribe();
    }
  }

  public inputKeyDown($event: any) {
    if($event.key === 'Enter' && this.form.status === 'VALID') {
      this.submit();
    }    
  }

  private keepUserDataOnlyForTesting() {
    localStorage['isAuthenticated'] = 'true';
    localStorage['userData'] = JSON.stringify(this.authService.getUser());
  }

}
