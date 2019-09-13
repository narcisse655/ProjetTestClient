import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercept request...');
        return next.handle(request).pipe( 
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('Event HttpResponse...');
                    //console.log('Current Users: '+this.authService.currentUser);
                    console.log('Event:==>> ', event);
                }
                return event;
            }),
            catchError(
                (err: HttpErrorResponse) => {
                    console.log('CatchError HttpErrorResponse...');
                    //if(!this.authService.getAuth()){
                    //console.log(this.authService.currentUsers);
                    let currentUser = localStorage.getItem('currentUser');
                    /* if (!this.authService.currentUser) { */
                    /* if (!currentUser) {
                        console.log('Error de currentUser');
                        return this.error('Username or password is not correct');
                    } */
                    if (err.status === 403 || err.status === 401) {
                        console.log('catch error 403 ==>> signOut ==> redirect to login')
                        this.authService.signOut();
                        this.router.navigate(['login']);
                        return this.error('Accès Interdit !!!');
                    }



                    /* if (err.status === 401) {
                        // auto logout if 401 response returned from api
                        
                        this.authService.signOut();
                        location.reload(true);
                    } */
                    //const error = err.error.message || err.statusText;
                    //return throwError(err);
                }))
    }

    error(message) {
        return throwError({ error: { message } });
    }
}