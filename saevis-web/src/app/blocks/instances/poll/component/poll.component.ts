import {Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {Poll, PollApi, LoopBackAuth} from '../../../sdk';
import {PollExtended} from '../poll-extended';
import {BlockFactory} from '../../../../../../../saevis/src/app/blocks';
import {ActionButton} from '../../../action-button';
import {BlockComponent} from '../../../block.component';

@Component({
  selector: 'saevis-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent extends BlockComponent<PollExtended> {

  @ViewChildren('optionelement')
  public optionElements: QueryList<ElementRef>;

  private option: string;

  public get normalActions(): ActionButton[] {
    if (this.content.getHasDone(this.userId)) {
      return [];
    }
    return [
      {
        name: 'vote',
        text: 'Stemmen',
        fn: this.vote
      }
    ];
  };

  constructor(public api: PollApi, auth: LoopBackAuth) {
    super(PollExtended, auth);
  }

  public vote() {
    const value = this.content.settings.multipleChoice
      ? this.content.options
          .filter((o: any) => o.checked)
          .map((o: any) => o.id)
      : [this.option];
    this.api.createVotes(this.content.id, {value}).subscribe(() => {
      this.api.findById(this.content.id).subscribe(
        (poll: Poll) => this.content = BlockFactory.createContent(PollExtended, poll)
      );
    });
  }

  public save() {
    delete this.content.id;
    const lastIndex = this.content.options.length -1;
    if (this.content.options[lastIndex].text === '') {
      this.removeOption(lastIndex);
    }

    super.save();
  }

  public removeOption(optionIndex: number) {
    this.content.options.splice(optionIndex, 1);
  }

  public addOption() {
    this.content.options.push({text: ''});
    this.optionElements.changes.take(1).subscribe((elements) => {
      setTimeout(() => elements.last.nativeElement.focus(), 0);
    });
  }
}
