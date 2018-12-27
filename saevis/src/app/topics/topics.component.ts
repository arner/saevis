import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Topic} from '../api/model/topic';
import {Observable} from 'rxjs';
import {TopicService} from '../api/api/topic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {
  private topics: Observable<Topic[]>;
  private userId: number;

  constructor(
    private topicService: TopicService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.topics = this.topicService.topicsGet();
  }

  create() {
    this.topicService.topicsPost({title: 'Test topic'}).subscribe((r) => {
      console.log(r);
    })
  }
}
