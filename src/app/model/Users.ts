import { Role } from './Role';

export class Users {

    password: string;
    roleList: Array<Role>; 
    
    constructor (public idUsers: string, public username: string, public active: boolean){

    }

}