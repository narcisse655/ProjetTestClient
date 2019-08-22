import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { MaterielListComponent } from '@app/materiel-list/materiel-list.component';
import { HeaderComponent } from '@app/header/header.component';


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

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService,
    private router: Router, 
    private route: ActivatedRoute,
    private materielList: MaterielListComponent,
    private header: HeaderComponent) {
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

  get Username(){
    return this.signInForm.get('username');
  }

  get Password(){
    return this.signInForm.get('password');
  }

  onSignIn(user) {
    console.log("Connexion ...");
    console.log(user);
    this.authService.sigIn(user)
      .subscribe(
        (resp) => {
          let jwt = resp.headers.get('Authorization');
          console.log('Nouveau token: ' + jwt);
          //this.authService.saveToken(jwt); 
          this.router.navigate([this.returnUrl]);
          this.header.ngOnInit();
          //this.router.navigate(['materiels']);
        },
        (error) => {
          this.errorMessage = error.error.message;
          console.log(this.errorMessage);
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
