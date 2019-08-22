import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    errorMessages: string;
    
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        console.log('Entrée AuthInterceptor...');
        let token = localStorage.getItem('token');
        console.log("token dans le localstorage: " + token);
        if (token) {
            request = request.clone({
                setHeaders: {
                    //Authorization: `Bearer ${this.authService.getToken()}`
                    Authorization: `Bearer ${token}`
                   // Authorization: token
                }
            });
            /* 
            request = request.clone({
                headers: request.headers.set('Bearer', this.authService.getToken())
            })  */
        }/*  else {
            this.router.navigate(['login']);
            console.log('Redirect to login ...');
        } */

        console.log("sortie AuthInterceptor...");


        return next.handle(request);
            /* .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        console.log('event--->>>', event);
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    console.log(error);
                    if (error.status === 403 || error.status === 401) {
                        error.error.message = "Username or password is not correct";
                        console.log('catch error 403 ==>> signOut ==> redirect to login')
                        this.authService.signOut();
                        this.router.navigate(['login']);
                    }
                    if (error.status === 400) {
                        alert(error.error);
                    }
                    return throwError(error);
                })); */

    }
}