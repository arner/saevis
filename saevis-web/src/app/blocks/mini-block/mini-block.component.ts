import {Component, Input, OnInit} from '@angular/core';
import {BlockExtended} from '../../shared/BlockExtended';

@Component({
  selector: 'saevis-mini-block',
  templateUrl: './mini-block.component.html',
  styleUrls: ['./mini-block.component.scss']
})
export class MiniBlockComponent implements OnInit {

  @Input()
  public block: BlockExtended;

  constructor() { }

  ngOnInit() {
    console.log(this.block);
  }

}
