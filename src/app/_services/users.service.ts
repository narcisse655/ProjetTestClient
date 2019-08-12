import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '@app/model/Users';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private baseUrl: string = 'http://localhost:8081/api/v1';

    constructor(private httpClient: HttpClient) { }

    getUsers(username): Observable<any>{
        return this.httpClient.get(this.baseUrl + '/users?u=' + username);
    }

}