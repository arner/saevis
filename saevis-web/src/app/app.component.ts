import {Component, OnInit} from '@angular/core';
import {LoopBackConfig} from './shared/sdk/lb.config';
import {environment} from '../environments/environment';

@Component({
  selector: 'saevis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Saevis';

  constructor() {
    LoopBackConfig.setBaseURL(environment.apiUrl);
  }

  ngOnInit() {
  }
}
