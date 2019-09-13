import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '@app/model/Users';
import { UsersForm } from '@app/model/users.form';

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    private baseUrl: string = 'http://localhost:8081/api/v1';

    constructor(private httpClient: HttpClient) { }

    getUsers(username): Observable<any>{
        return this.httpClient.get(this.baseUrl + '/users?u=' + username);
    }

    getUsersList(page: number): Observable<any>{
        return this.httpClient.get(this.baseUrl+'/users/list?page='+page);
    }

    enableUser(id: number): Observable<any>{
        return this.httpClient.put(this.baseUrl+'/users/enable/'+id, null);
    }

    disableUser(id: number): Observable<any>{
        return this.httpClient.put(this.baseUrl+'/users/disable/'+id, null);
    }

    getUsersEnable(username): Observable<any>{
        return this.httpClient.get(this.baseUrl+'/users/'+username);
    }

    newUser(usersForm: UsersForm): Observable<Object>{
        return this.httpClient.post(this.baseUrl+'/register', usersForm);
    }

}