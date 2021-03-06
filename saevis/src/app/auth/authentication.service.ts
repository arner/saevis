import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {AuthService} from '../api/api/auth.service';
import {User} from '../api/model/user';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string, returnUrl: string): void {
    this.authService.authLoginPost({username, password}).subscribe((user: User) => {
      if (user && user.token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

        console.log('Logged in!', user);

        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
      }
    });
  }

  public logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
