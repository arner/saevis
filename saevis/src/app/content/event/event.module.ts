import { NgModule } from '@angular/core';
import { EventPreviewComponent } from './event-preview/event-preview.component';
import {EventComponent} from './event/event.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EventNewComponent } from './event-new/event-new.component';

@NgModule({
  declarations: [EventComponent, EventPreviewComponent, EventNewComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [EventComponent, EventNewComponent, EventPreviewComponent],
  exports: [EventComponent, EventPreviewComponent]
})
export class EventModule { }
