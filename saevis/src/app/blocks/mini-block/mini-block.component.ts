import {Component, Input, OnInit} from '@angular/core';
import {BlockExtended} from '../../shared/BlockExtended';
import {LoopBackAuth} from '../../shared/sdk/services/core/auth.service';
import {BlockTextOptions} from '../../shared/BlockProperties';

@Component({
  selector: 'saevis-mini-block',
  templateUrl: './mini-block.component.html',
  styleUrls: ['./mini-block.component.scss']
})
export class MiniBlockComponent implements OnInit {

  @Input()
  public block: BlockExtended;

  public options: BlockTextOptions;

  constructor(private auth: LoopBackAuth) { }

  ngOnInit() {
    this.options = {
      userId: this.auth.getCurrentUserId()
    };
  }

}
