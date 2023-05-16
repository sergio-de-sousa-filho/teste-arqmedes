import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTableModule,  
        MatDialogModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        TranslateModule.forChild(),
        FormsModule 
    ],
    declarations: [
        ErrorDialogComponent,
        AppToolbarComponent
    ],
    exports: [        
        CommonModule,
        MatSnackBarModule,
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatTableModule,  
        MatDialogModule,
        MatPaginatorModule,
        ErrorDialogComponent,
        AppToolbarComponent,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        TranslateModule,
        FormsModule 
    ],
    providers: [
        
    ]
})
export class SharedModule { }