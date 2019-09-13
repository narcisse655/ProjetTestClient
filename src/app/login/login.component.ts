import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService, UsersService } from '@app/_services';
import { MaterielListComponent } from '@app/materiel-list/materiel-list.component';
import { HeaderComponent } from '@app/header/header.component';
import { Users } from '@app/model/Users';
import { RoleUtils } from '@app/model/RoleUtils';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;
  returnUrl: string;
  //isAuth: boolean = false;
  userEnable: Users;
  role: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private materielList: MaterielListComponent,
    private header: HeaderComponent,
    private usersService: UsersService) {
    // redirect to list of materiels if already logged in
    if (this.authService.getToken() && localStorage.getItem('currentUser')) {
      this.router.navigate(['materiels']);
    }
  }

  ngOnInit() {
    console.log('LoginComponent is create');
    this.initForm();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{4,}/)]]
    });
  }

  get Username() {
    return this.signInForm.get('username');
  }

  get Password() {
    return this.signInForm.get('password');
  }

  signIn(user) {
    console.log("Connexion signIn ...");
    console.log(user);
    this.authService.signIn(user)
      .subscribe(
        (resp) => {
          let jwt = resp.headers.get('Authorization');
          console.log('Nouveau token: ' + jwt);
          //this.authService.saveToken(jwt); 
          if (this.role === RoleUtils.Admin){
            this.router.navigate([this.returnUrl]);
          }else{
            this.router.navigate(['files']);
          }
          this.header.ngOnInit();
          //this.router.navigate(['materiels']);
        },
        (error) => {
          //this.errorMessage = error.error.message;
          this.errorMessage = 'Nom utilisateur ou mot de passe incorrect.';
          console.log(this.errorMessage);
        }
      );
  }

  onSignIn(user) {
    console.log("Connexion onSignIn ...");
    console.log(user);
    this.usersService.getUsersEnable(user.username).subscribe(
      (data) => {
        if (data) {
          let roles = data.roleList;
          for (let role of roles){
            if (role.roleName === RoleUtils.Admin){
              this.role = RoleUtils.Admin;
            }
          }
          console.log(data);
          //on vérifie si le user est activé avant d'autoriser la connexion
          if (data.active) {
            this.signIn(user);
          } else {
            this.errorMessage = 'Cet utilisateur est désactivé.';
          }
        }else{
          this.errorMessage = 'Nom utilisateur ou mot de passe incorrect.';
        }
      },
      (error) => {
        console.log(error);
      }
    );

  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  onHideMessage() {
    this.errorMessage = null;
    this.materielList.error = null;
  }


}
