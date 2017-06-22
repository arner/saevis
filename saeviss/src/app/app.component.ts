import {Component, OnInit} from '@angular/core';
import { Topic, FireLoopRef } from './shared/sdk/models';
import { RealTime } from './shared/sdk/services';
import {Observable} from 'rxjs';

@Component({
  selector: 'saevis-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'Saevis';
  private topics    : Observable<Topic[]>;
  private topic     : Topic = new Topic();
  private reference : FireLoopRef<Topic>;

  constructor(private rt: RealTime) {
    this.rt.onReady().subscribe(() => {
      this.initiate();
    });
  }

  initiate() {
    this.reference = this.rt.FireLoop.ref<Topic>(Topic);
    this.topics = this.reference.on('change', {include: {blocks: 'blockContent'}});

    this.topics.subscribe((topics: Topic[]) => {
      //this.topics = topics;
      console.log('T', topics);
    });
    this.reference.stats().subscribe((stats: any) => console.log(stats));
  }

  add(): void {
    console.log('Going to add', this.topic);
    this.reference.create(this.topic).subscribe((r) => {
      console.log('created', r);
      this.topic = new Topic();
    }, (err) => console.error(err));
  }

  update(topic: Topic): void {
    console.log('going to update', topic);
    this.reference.upsert(topic).subscribe((r) => {
      console.log('updated', r);
    }, (err) => console.error(err));
  }

  remove(topic: Topic): void {
    console.log('going to remove', topic);
    this.reference.remove(topic).subscribe();
  }
}
