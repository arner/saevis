import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule, MdCheckboxModule, MdCardModule, MdToolbarModule, MdSidenavModule,
  MdIconModule, MdRadioModule, MdListModule, MdDatepickerModule, MdNativeDateModule, MdSelectModule, MdInputModule,
  MdDialogModule, MdMenuModule, MdSlideToggleModule, MdChipsModule, MdProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdRadioModule,
    MdListModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdInputModule,
    MdSelectModule,
    MdDialogModule,
    MdSlideToggleModule,
    MdMenuModule,
    MdChipsModule,
    MdProgressBarModule,
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MdCardModule,
    MdToolbarModule,
    MdSidenavModule,
    MdIconModule,
    MdRadioModule,
    MdListModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdInputModule,
    MdSelectModule,
    MdDialogModule,
    MdSlideToggleModule,
    MdMenuModule,
    MdChipsModule,
    MdProgressBarModule,
  ],
  declarations: []
})
export class MaterialModule { }
