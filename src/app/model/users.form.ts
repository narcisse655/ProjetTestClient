import { Role } from './Role';

export class UsersForm {

    password: string;
    repassword: string;
    
    constructor (public username: string, public active: boolean){

    }

}