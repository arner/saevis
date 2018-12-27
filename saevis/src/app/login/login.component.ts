import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public email: string = 'arne';
  public password: string = 'password';

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public login() {
    this.authenticationService.login(this.email, this.password);
  }
}
