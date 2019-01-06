import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimeagoModule} from 'ngx-timeago';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TimeagoModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    TimeagoModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
