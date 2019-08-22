import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, MaterielService } from '@app/_services';
import { MaterielListComponent } from '@app/materiel-list/materiel-list.component';
import { Users } from '@app/model/Users';
import { RoleUtils } from '@app/model/RoleUtils';


@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: Users;


  constructor(private router: Router, private authService: AuthenticationService,
    private materielService: MaterielService, private materielList: MaterielListComponent) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    console.log('HeaderComponent is create');
  }

  onSignOut() {
    this.authService.signOut();
    console.log('Logout ...');
    this.goToLogin();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToMateriels() {
    if (this.authService.getToken() === null) {
      this.materielList.error = 'Accès interdit !!!';
      this.authService.signOut();
      this.router.navigate(['login']);
    } else {
      this.getMateriels();
    }
  }

  getMateriels() {
    /* this.materielService.getMaterielsListByPage(0).subscribe(
      resp => console.log(resp), error => console.log(error)
    ); */
    this.materielList.onGetMaterielsListByPage();
    this.router.navigate(['materiels']);
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  get isAdmin() {
    let resp;
    let roles = this.currentUser.roleList;
    let i=0;
    //console.log('Current user roles: ' + JSON.stringify(roles));
    for (let role of roles) {
      //console.log('Entrée dans le tableau des roles ...')
      if (role.roleName == RoleUtils.Admin) {
        resp = true;
        break;
      }else{
        resp = false;
      }
    }
    //console.log('Admin?: ' + resp);
    return resp;
    //return this.currentUser && this.currentUser.roleList[0].roleName === RoleUtils.Admin;
  }


}
