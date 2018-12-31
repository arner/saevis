import { NgModule } from '@angular/core';
import { ContentComponent } from './content/content.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { ContentPreviewComponent } from './content-preview/content-preview.component';
import {DiscussionModule} from './discussion/discussion.module';
import {EventModule} from './event/event.module';
import { ContentPreviewDirective } from './content-preview/content-preview.directive';
import {ContentDirective} from './content/content.directive';

@NgModule({
  declarations: [
    ContentComponent,
    ContentPreviewComponent,
    ContentPreviewDirective,
    ContentDirective
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DiscussionModule,
    EventModule
  ],
  exports: [
    ContentComponent,
    ContentPreviewComponent
  ]
})
export class ContentModule { }
