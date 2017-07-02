import {Component, Input, OnInit} from '@angular/core';
import {Poll} from '../../shared/sdk/models/Poll';
import {MemberApi} from '../../shared/sdk/services/custom/Member';
import {PollApi} from '../../shared/sdk/services/custom/Poll';
import {BlockMode} from '../../shared/BlockExtended';
import {PollExtended} from '../../shared/PollExtended';

@Component({
  selector: 'saevis-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {
  private option: string;

  @Input()
  private mode: BlockMode;
  private blockMode = BlockMode;

  @Input()
  public content: PollExtended;

  constructor(private pollApi: PollApi) { }

  ngOnInit() {
  }

  public vote() {
    const value = this.content.settings.multipleChoice
      ? this.content.options
          .filter((o: any) => o.checked)
          .map((o: any) => o.id)
      : [this.option];
    this.pollApi.createVotes(this.content.id, {value}).subscribe(() => {
      this.pollApi.findById(this.content.id).subscribe((poll: Poll) => this.content = new PollExtended(poll));
    });
  }

  public save() {
    delete this.content.id;
    this.pollApi.create(this.content).subscribe((poll: Poll) => {
      this.content = new PollExtended(poll);
      this.mode = BlockMode.NORMAL;
    });
  }

  public removeOption(optionIndex: number) {
    this.content.options.splice(optionIndex, 1);
  }
  public addOption() {
    this.content.options.push({text: ''});
  }
}
