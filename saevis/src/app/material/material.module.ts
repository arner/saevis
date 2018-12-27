import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule,
  MatIconModule, MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule, MatProgressBarModule, MatRadioModule,
  MatSelectModule,
  MatSidenavModule, MatSlideToggleModule, MatToolbarModule, MatBadgeModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatMenuModule,
    MatChipsModule,
    MatBadgeModule
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatRadioModule,
    MatListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatMenuModule,
    MatChipsModule,
    MatBadgeModule
  ],
})
export class MaterialModule { }
