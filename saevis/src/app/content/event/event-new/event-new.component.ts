import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../../../api/model/event';
import {NewComponent} from '../../new-component.interface';
import {Topic} from '../../../api/model/topic';
import {Content} from '../../../api/model/content';
import {DefaultService} from '../../../api/api/default.service';
import {Store} from '@ngrx/store';
import * as fromContent from '../../store/content.reducer';
import {CreateContent} from '../../store/content.actions';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit, NewComponent {
  @Input()
  public item: Event;

  @Input()
  public topic: Topic;

  public times: [Date, Date];
  public validateForm: FormGroup;

  constructor(private store: Store<fromContent.State>) {
    const startTime = new Date();
    startTime.setHours(20);
    startTime.setMinutes(0);
    startTime.setSeconds(0);

    const endTime = new Date(startTime);
    endTime.setHours(22);

    this.times = [startTime, endTime];
    this.item = {
      title: '',
      text: '',
      startTime,
      endTime
    };
  }

  ngOnInit() {
    this.validateForm = new FormGroup({
      title: new FormControl(this.topic ? this.topic.title : '', [Validators.required]),
      rangePickerTime: new FormControl(null, [Validators.required]),
    });
  }

  public save(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    // TODO reduxify
    const content = {
      topicId: this.topic.id,
      type: Content.TypeEnum.EVENT,
      event: {
        startTime: this.validateForm.value.rangePickerTime[0] as Date,
        endTime: this.validateForm.value.rangePickerTime[1] as Date,
        title: this.validateForm.value.title,
        text: ''
      }
    };

    this.store.dispatch(new CreateContent(content));
  }
}
