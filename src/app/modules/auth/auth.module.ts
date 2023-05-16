import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component'
import { CommonModule } from "@angular/common";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "../shared/shared.module";


@NgModule({
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: []
})
export class AuthModule { }