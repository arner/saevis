import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule,
  MatIcon, MatIconModule, MatRadioModule, MatListModule, MatNativeDateModule, MatDatepickerModule, MatInputModule,
  MatSelectModule, MatDialogModule, MatSlideToggleModule, MatMenuModule
} from '@angular/material';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIcon,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatMenuModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIcon,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatMenuModule
  ],
  declarations: []
})
export class MaterialModule { }
