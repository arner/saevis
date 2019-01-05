import {Component, Input, OnInit} from '@angular/core';
import {Discussion} from '../../../api/model/discussion';
import {Comment} from '../../../api/model/comment';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {DiscussionService} from '../../../api/api/discussion.service';
import {ItemComponent} from '../../item-component.interface';
import {CreateComment} from '../discussion.actions';
import {Store} from '@ngrx/store';
import * as fromContent from '../../content.reducer';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.scss']
})
export class DiscussionComponent implements OnInit, ItemComponent {
  @Input()
  public item: Discussion;

  public validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<fromContent.State>) {
    this.validateForm = this.fb.group({
      comment : [ '', [ Validators.required, Validators.minLength(1) ] ]
    });
  }

  public submitForm($event, value): void {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
      this.validateForm.controls[ key ].updateValueAndValidity();
    }

    this.store.dispatch(new CreateComment(this.item.id, value.comment, this.item.contentId));
  };

  ngOnInit() {
  }
}
