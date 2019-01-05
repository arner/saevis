import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import { ContentPreviewComponent } from './content-preview/content-preview.component';
import {DiscussionModule} from './discussion/discussion.module';
import {EventModule} from './event/event.module';
import { ContentPreviewDirective } from './content-preview/content-preview.directive';
import {ContentDirective} from './content-item/content.directive';
import { ContentsComponent } from './contents/contents.component';
import {ContentItemComponent} from './content-item/content-item.component';
import * as fromContent from './content.reducer';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ContentEffects} from './content.effects';
import {EventEffects} from './event/event.effects';
import {DiscussionEffects} from './discussion/discussion.effects';

@NgModule({
  declarations: [
    ContentPreviewComponent,
    ContentPreviewDirective,
    ContentDirective,
    ContentsComponent,
    ContentItemComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DiscussionModule,
    EventModule,
    StoreModule.forFeature('content', fromContent.reducer),
    EffectsModule.forFeature([ContentEffects, EventEffects, DiscussionEffects])
  ],
  exports: [
    ContentsComponent,
    ContentPreviewComponent
  ]
})
export class ContentModule { }
