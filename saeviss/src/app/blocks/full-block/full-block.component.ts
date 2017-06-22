import {Component, Input, OnInit} from '@angular/core';
import {BlockExtended} from '../../shared/BlockExtended';

@Component({
  selector: 'saevis-full-block',
  templateUrl: './full-block.component.html',
  styleUrls: ['./full-block.component.scss']
})
export class FullBlockComponent implements OnInit {

  @Input()
  public block: BlockExtended;

  constructor() { }

  ngOnInit() {
  }

}
