import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materiel } from '../model/Materiel';
import { Router } from '@angular/router';
import { MaterielService, AuthenticationService } from '@app/_services';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-materiel-list',
  templateUrl: './materiel-list.component.html',
  styleUrls: ['./materiel-list.component.css']
})

export class MaterielListComponent implements OnInit {

  //materiels: Observable<Materiel[]>
  _materiels: Array<any>;
  imageExist: boolean = false;
  fileName: string;
  name: string; 
  description: string;
  page: number = 0;
  pages: Array<number>;
  totalPages: number;
  _data: any;
  hide: boolean = true;
  error: string;
  isDelete: boolean;
  errorMessage: string; 

  constructor(private materielService: MaterielService, private authService: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
    console.log('MaterielListComponent is create');
    //this.materiels = this.materielService.getMaterielsList();
    this.onGetMaterielsListByPage();
  }

  showImageMateriel(fileName: string, description: string){
    if (fileName!==""){
      this.imageExist = true;
      let splitChaine = fileName.split('.');
      this.name = splitChaine[0];
      console.log("Nom de l'image: "+this.name);
      this.fileName = fileName;
      console.log('showImageMateriel('+this.fileName+'): '+this.fileName);
    }
    if (description !== ""){
      this.description = description;
      console.log("Description: "+this.description);
    }
  }

  onHideCard(){
    this.imageExist = false;
  }

  onNewMateriel(){
    this.router.navigate(['/materiels', 'new']);
  }

  onGetMaterielsListByPage(){
    this.materielService.getMaterielsListByPage(this.page).subscribe(
      (data) => {
        if (data){
          this.hide = false;
          this._data = data;
          //console.log(data);
          this._materiels = data['content'];
          console.log(this._materiels);
  
          this.pages = new Array(data['totalPages']);
          //console.log(this.pages);
        }
      },
      (error) => {
        console.log(error);
        this.error = error.error.message;
        /* this.authService.signOut();
        this.router.navigate(['login']); */
      }
    );
  }

  onChangePage(i, event: any){
    event.preventDefault(); 
    this.page = i;
    this.totalPages = this._data['totalPages']-1;
    //console.log('index de Array pages: '+i);
    this.onGetMaterielsListByPage();
  }

  onDeleteMateriel(id){
    this.materielService.deleteMateriel(id).subscribe(
      (resp)=>{
        console.log('materiel '+id+' Supprimé avec succès !!! '+resp)
        this.errorMessage = 'Materiel '+id+' Supprimé avec succès !!!'
        this.isDelete = true;
        this.ngOnInit();
      },
      (error)=>{
        console.log(error);
        this.isDelete = false;
      }
    );
  }

  onViewMateriel(id: number){
    this.router.navigate(['/materiels', 'view', id]);
  }
  


}
