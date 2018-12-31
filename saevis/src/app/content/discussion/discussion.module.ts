import { NgModule } from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DiscussionComponent} from './discussion/discussion.component';
import { DiscussionPreviewComponent } from './discussion-preview/discussion-preview.component';

@NgModule({
  declarations: [
    DiscussionComponent,
    DiscussionPreviewComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DiscussionPreviewComponent,
    DiscussionComponent
  ],
  exports: [
    DiscussionComponent,
    DiscussionPreviewComponent
  ]
})
export class DiscussionModule { }
