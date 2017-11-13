import { Injectable } from '@angular/core';
import {MemberApi, Member} from './shared/sdk';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoopBackAuth} from './shared/sdk/services/core/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class MemberService {
  private _currentUser: BehaviorSubject<Member> = new BehaviorSubject<Member>(null);
  public get currentUser(): Observable<Member> {
    return this._currentUser.asObservable();
  }

  constructor(
    private memberApi: MemberApi,
    private loopbackAuth: LoopBackAuth,
    private router: Router
  ) {
    const user = this.loopbackAuth.getCurrentUserData();
    if (user) {
      this._currentUser.next(user);
    }
  }

  login(credentials: Credentials, url?: string): void {
    this.memberApi.login(credentials).subscribe((res: any) => {
      this._currentUser.next(res.user);
      this.loopbackAuth.setUser(res.user);
      this.router.navigate([url || '/topics']);
    }, (err: Error) => {
      console.warn(err);
      // TODO: how to handle?
    });
  }
}

interface Credentials {
  email: string;
  password: string;
}
