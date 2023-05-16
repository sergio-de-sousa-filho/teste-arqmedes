import { Component, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { User } from 'src/app/modules/users/models/User';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './app-toolbar.component.html',
  styleUrls: ['./app-toolbar.component.scss']
})
export class AppToolbarComponent {
  @Input('show-user-data') public showUserData: boolean = true;

  public userLogged: User | null = null;
  public currentLanguage = 'pt';
  public englishLanguageSelected = false;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public constructor(private authService: AuthService,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
    private router: Router) {

    this.userLogged = this.authService.getUser();
    this.initLanguageEvents();
  }

  public logout() {
    this.authService.setUser(null);
    this.router.navigate(['/auth/login']);
    this.snackBar.open(this.translateService.instant('app-toolbar.you-have-been-logged-out'), 'Ok', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

  public toggleLanguage($event: any) {    
    const changeLanguageTo = $event.target.checked ? 'en' : 'pt';    
    this.translateService.use(changeLanguageTo);
    localStorage['lang'] = changeLanguageTo;    
  }

  private initLanguageEvents() {    
    this.currentLanguage = this.translateService.currentLang;
    this.englishLanguageSelected = this.currentLanguage === 'en';
    
    this.translateService.onLangChange.subscribe(
      language => {        
        this.currentLanguage = language.lang;
        this.englishLanguageSelected = this.currentLanguage === 'en';
      }
    );
  }

}
