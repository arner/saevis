import {Component, Input, OnInit} from '@angular/core';
import {Poll} from '../../shared/sdk/models/Poll';

@Component({
  selector: 'saevis-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  @Input()
  public poll: Poll;

  constructor() { }

  ngOnInit() {
  }

}
