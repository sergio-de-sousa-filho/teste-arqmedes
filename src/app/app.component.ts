import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './modules/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public constructor(private authService: AuthService,
    private translateService: TranslateService,
    private router: Router) {

  }

  public ngOnInit(): void {

    this.keepUserDataOnlyForTesting();
    this.setLanguage();

    if(this.authService.isAuthenticated()) 
      this.router.navigate(['/users/list']);    
    else 
      this.router.navigate(['/auth/login']);    
  }

  private keepUserDataOnlyForTesting() {
    if(localStorage['isAuthenticated'] === 'true') {
      const existingUserData = JSON.parse(localStorage['userData']);
      this.authService.setUser(existingUserData);
    }
  }

  private setLanguage() {
    let defaultLanguage = 'pt';
    if(localStorage['lang']) {
      defaultLanguage = localStorage['lang'];
    }  

    console.log('app component - set language: ', defaultLanguage)
    this.translateService.setDefaultLang(defaultLanguage);
    this.translateService.use(defaultLanguage);      
  }
  
}
