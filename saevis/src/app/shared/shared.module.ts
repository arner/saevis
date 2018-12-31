import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimeagoModule} from 'ngx-timeago';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TimeagoModule,
    NgZorroAntdModule
  ],
  exports: [
    CommonModule,
    TimeagoModule,
    NgZorroAntdModule
  ]
})
export class SharedModule { }
