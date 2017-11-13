import { Component, OnInit } from '@angular/core';
import {MemberApi, Member} from '../shared/sdk';
import {MemberService} from '../member.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'saevis-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public currentUser: Observable<Member>;
  constructor(private memberService: MemberService) { }

  ngOnInit() {
    this.currentUser = this.memberService.currentUser;
  }

  login() {
    this.memberService.login({email: 'arne@example.com', password: 'password'})
  }
}
