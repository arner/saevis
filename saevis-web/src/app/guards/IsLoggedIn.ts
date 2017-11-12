import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { LoopBackAuth } from '../shared/sdk/services/core/auth.service';

@Injectable()
export class IsLoggedIn implements CanActivate {

  constructor(private loopBackAuth: LoopBackAuth, private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!this.loopBackAuth.getCurrentUserId();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
