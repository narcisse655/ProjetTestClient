import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Users } from '@app/model/Users';
import { UsersService } from './users.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host: string = 'http://localhost:8081';
  private jwtToken: string = null;
  //private isAuth: boolean = false;
  isLoggedIn = false;
  //currentUsers: {};
  //users: Users;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<Users>;

  constructor(private httpClient: HttpClient, private usersService: UsersService) {
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Users {
    return this.currentUserSubject.value;
  }

  signIn(user) {
    return this.httpClient
      .post(this.host + '/login', user, { observe: 'response' })
      .pipe(
        tap(
          (resp) => {
            this.isLoggedIn = true,
              this.jwtToken = resp.headers.get('Authorization'),
              this.saveToken(this.jwtToken),
              this.usersService.getUsers(user.username).subscribe(
                (user) => {
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
                },
                (error) => {
                  console.log(error)
                }
              );
          }));
  }

  saveToken(jwt) {
    localStorage.setItem('token', jwt);
  }

  getToken() {
    this.jwtToken = localStorage.getItem('token');
    return this.jwtToken;
  }

  signOut() {
    this.jwtToken = null;
    this.currentUserSubject.next(null);
    this.isLoggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  /*  setAuth(isAuth: boolean){
     this.isAuth = isAuth;
   }
   getAuth(){
     return this.isAuth;
   } */

}
