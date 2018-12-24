import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventComponent, PollComponent} from './instances';
import {FullBlockComponent} from './full-block/full-block.component';
import {MaterialModule} from '../shared/material.module';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
  ],
  exports: [
    FullBlockComponent
  ],
  declarations: [
    PollComponent,
    EventComponent,
    FullBlockComponent,
  ],
  entryComponents: [PollComponent, EventComponent]
})
export class BlocksModule { }
