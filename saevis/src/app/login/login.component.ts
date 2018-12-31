import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../auth/authentication.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public validateForm: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [ 'arne', [ Validators.required ] ],
      password: [ 'testpass', [ Validators.required ] ],
      remember: [ true ]
    });
  }

  public login($event, value) {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');

    this.authenticationService.login(value.username, value.password, returnUrl);
  }
}
