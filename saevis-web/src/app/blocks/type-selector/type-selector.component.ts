import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'saevis-type-selector',
  templateUrl: './type-selector.component.html',
  styleUrls: ['./type-selector.component.scss']
})
export class TypeSelectorComponent implements OnInit {
  public blockTypes: string[] = ['Poll', 'Event'];
  public blockType: string;

  constructor(public dialogRef: MatDialogRef<TypeSelectorComponent>) { }

  ngOnInit() {
  }

}
