import { Component, OnInit } from '@angular/core';
import { Users } from '@app/model/Users';
import { UsersService } from '@app/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersForm } from '@app/model/users.form';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  usersList: Array<any>
  page: number = 0;
  dataExist: boolean;
  newUsersExist: boolean;
  isAdmin: boolean;
  usersForm: UsersForm = new UsersForm('', null);
  message: any;
  errorMessage: any;
  userForm: FormGroup;
  pages: Array<number>;

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getUsersListByPage();
    this.initForm();
  }

  getUsersListByPage() {
    this.newUsersExist = false;
    this.dataExist = false;
    this.usersService.getUsersList(this.page).subscribe(
      (data) => {
        this.usersList = data['content'];
        console.log(this.usersList)
        this.dataExist = true;
        this.pages = new Array(data['totalPages']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onNewUsers() {
    this.newUsersExist = true;
  }

  onUsersList() {
    this.newUsersExist = false;
  }

  onDisableUser(id) {
    this.message = null;
    console.log('id user to disable '+id);
    this.usersService.disableUser(id).subscribe(
      (resp) => {
        console.log('disable user ...');
        console.log(resp);
        this.message = 'User désactivé avec succès.';
        this.ngOnInit();
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  onEnableUser(id) {
    this.message = null;
    console.log('id user to enable '+id);
    this.usersService.enableUser(id).subscribe(
      (resp) => {
        console.log('enable user ...');
        console.log(resp);
        this.message = 'User activé avec succès.';
        this.ngOnInit();
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  initForm(){
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]],
      repassword: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{8,}/)]]
    });
  }

  get Username() {
    return this.userForm.get('username');
  }

  get Password() {
    return this.userForm.get('password');
  }

  get Repassword() {
    return this.userForm.get('repassword');
  }

  onNewUser(){
    const username = this.userForm.get('username').value;
    const password = this.userForm.get('password').value;
    const repassword = this.userForm.get('repassword').value;
    if (password === repassword){
      this.usersForm.username = username;
      this.usersForm.password = password;
      this.usersForm.repassword = repassword;
      console.log(this.usersForm);
      this.usersService.newUser(this.usersForm).subscribe(
        (resp)=>{
          console.log(resp);
          this.ngOnInit();
        },
        (error)=>{
          console.log(error);
        }
      );
    }else{
      this.errorMessage = 'Mots de passe non identiques.';
    }
  }

  onChangePage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.getUsersListByPage();
  }



}
