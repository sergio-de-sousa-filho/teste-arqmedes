import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { SharedModule } from "../shared/shared.module";
import { AddOrUpdateComponent } from './components/add-or-update/add-or-update.component';
import { RouterModule } from "@angular/router";
import { UserDetailsDialogComponent } from './components/user-details-dialog/user-details-dialog.component';
import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component';
import { provideEnvironmentNgxMask, NgxMaskDirective, NgxMaskPipe } from "ngx-mask";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    HttpClientModule,
    SharedModule,
    RouterModule,
    NgxMaskDirective,
    NgxMaskPipe,
    TranslateModule.forChild()
  ],
  declarations: [
    UsersListComponent,
    AddOrUpdateComponent,
    UserDetailsDialogComponent,
    DeleteUserDialogComponent
  ],
  providers: [ provideEnvironmentNgxMask() ]
})
export class UsersModule { }