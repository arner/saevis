import {Component, Input, OnInit} from '@angular/core';
import {Poll} from '../../shared/sdk/models/Poll';
import {MemberApi} from '../../shared/sdk/services/custom/Member';
import {PollApi} from '../../shared/sdk/services/custom/Poll';
import {BlockMode} from '../../shared/BlockExtended';

@Component({
  selector: 'saevis-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  private poll: Poll;
  private option: string;

  @Input()
  private mode: BlockMode;
  private blockMode = BlockMode;

  @Input() set content(poll: Poll) {
    this.poll = poll;
    this.poll.settings = this.poll.settings || {};
    if (this.mode === BlockMode.NEW) {
      this.poll.options = [{text: ''}, {text: ''}];
    }
  }

  constructor(private memberApi: MemberApi, private pollApi: PollApi) { }

  ngOnInit() {
    console.log(this.poll);
  }

  public vote() {
    this.pollApi.createVotes(this.poll.id, {value: [this.option]}).subscribe(() => {
      this.pollApi.findById(this.poll.id).subscribe((poll: Poll) => this.poll = poll);
    });
  }

  public save() {
    delete this.poll.id;
    console.log('create', this.poll);
    this.pollApi.create(this.poll).subscribe((poll: Poll) => {
      this.poll = poll;
      this.mode = BlockMode.NORMAL;
    });
  }

  public removeOption(optionIndex: number) {
    this.poll.options.splice(optionIndex, 1);
  }
  public addOption() {
    this.poll.options.push({text: ''});
  }
}
