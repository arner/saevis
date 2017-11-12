import { Component, OnInit } from '@angular/core';
import {MemberService} from '../member.service';

@Component({
  selector: 'saevis-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string = 'arne@example.com';
  public password: string = 'password';

  constructor(private memberService: MemberService) { }

  ngOnInit() {
  }

  login() {
    this.memberService.login({email: this.email, password: this.password});
  }
}
