import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materiel } from '../model/Materiel';
import { Router } from '@angular/router';
import { MaterielService, AuthenticationService } from '@app/_services';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Users } from '@app/model/Users';
import { RoleUtils } from '@app/model/RoleUtils';

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
  materiel: Materiel;

  isUpdated: boolean;
  materielsToUpdate: any;
  fileNameUpdated: string;
  fileIsUploading: boolean;
  fileDataUpdated: { fileName: "", fileDownloadUri: "", fileType: "", size: undefined };
  fileNameNoUpdated: string;
  currentUser: Users;
  fileDetected: File;

  constructor(
    private materielService: MaterielService,
    private authService: AuthenticationService,
    private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    console.log('MaterielListComponent is create');
    this.onGetMaterielsListByPage();
    this.isUpdated = false;
  }

  showImageMateriel(fileName: string, description: string) {
    if (fileName !== "") {
      this.imageExist = true;
      let splitChaine = fileName.split('.');
      this.name = splitChaine[0];
      console.log("Nom de l'image: " + this.name);
      this.fileName = fileName;
      console.log('showImageMateriel(' + this.fileName + '): ' + this.fileName);
    }
    if (description !== "") {
      this.description = description;
      console.log("Description: " + this.description);
    }
  }

  onHideCard() {
    this.imageExist = false;
  }

  onNewMateriel() {
    this.router.navigate(['/materiels', 'new']);
  }

  onGetMaterielsListByPage() {
    this.materielService.getMaterielsListByPage(this.page).subscribe(
      (data) => {
        if (data) {
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

  onChangePage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.totalPages = this._data['totalPages'] - 1;
    //console.log('index de Array pages: '+i);
    this.onGetMaterielsListByPage();
  }

  onDeleteMateriel(id: number) {
    this.materiel = null;
    this.errorMessage = null;
    let click = confirm('Voulez-vous supprimer le matériel ' + id + ' ?').valueOf();
    console.log(click);
    if (click) {
      console.log('Get materiel...')
      //this.materiel = new Materiel('', undefined, '', '');
      this.materielService.getMateriel(id).subscribe(
        (materiel) => {
          this.materiel = materiel;
          console.log('materiel = ' + JSON.stringify(this.materiel));

          console.log('Delete file...')
          this.materielService.deleteFile(this.materiel.fileName).subscribe(
            (resp) => {
              console.log('Fichier Supprimé avec succès: ' + resp);

              console.log('Delete  matériel...');
              this.materielService.deleteMateriel(id).subscribe(
                (resp) => {
                  console.log('materiel Supprimé avec succès: ' + resp)
                  this.errorMessage = 'Materiel ' + id + ' Supprimé avec succès !!!'
                  this.isDelete = true;
                  this.ngOnInit();
                },
                (error) => {
                  console.log('Materiel no deleted: ' + error);
                  this.isDelete = false;
                }
              );
            },
            (error) => {
              console.log('Fichier not deleted: ' + error);
            }
          );

        },
        (error) => {
          console.log('materiel not found: ' + error);
        }
      );
    }

  }


  onViewMateriel(id: number) {
    this.router.navigate(['/materiels', 'view', id]);
  }

  materielToUpdateForm = new FormGroup({
    refMateriel: new FormControl(),
    designMateriel: new FormControl(),
    puMateriel: new FormControl(),
    description: new FormControl()
  });

  get MaterielRef() {
    return this.materielToUpdateForm.get('refMateriel');
  }

  get MaterielDesignation() {
    return this.materielToUpdateForm.get('designMateriel');
  }

  get MaterielPu() {
    return this.materielToUpdateForm.get('puMateriel');
  }

  get MaterielDescription() {
    return this.materielToUpdateForm.get('description');
  }

  onGetMateriel(id) {
    console.log('Edit materiel: get materiel...');
    this.materielService.getMateriels(id).subscribe(
      (data) => {
        this.materielsToUpdate = data;
        this.fileNameNoUpdated = this.materielsToUpdate[0].fileName;
        console.log('fileNameNoUpdated: ' + this.fileNameNoUpdated)
        //console.log('materielsToUpdate: '+this.materielsToUpdate);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /* onUpdateMateriel(materielToUpdate) {
    console.log('Update Materiel...');
    console.log('materielToUpdate: '+JSON.stringify(materielToUpdate));
    console.log('this.fileNameNoUpdated '+this.fileNameNoUpdated);
    this.materiel = new Materiel("", undefined, "", "");
    if (this.fileNameUpdated){
      this.materiel.fileName = this.fileNameUpdated;
    }else{
      this.materiel.fileName = this.fileNameNoUpdated;
    }
    console.log('this.materiel.fileName '+this.materiel.fileName);
    this.materiel.description = materielToUpdate.description;
    this.materiel.refMateriel = materielToUpdate.refMateriel;
    this.materiel.puMateriel = materielToUpdate.puMateriel;
    this.materiel.designMateriel = materielToUpdate.designMateriel;
    console.log(JSON.stringify(this.materiel));

    this.materielService.updateMateriel(this.materiel.refMateriel, this.materiel).subscribe(
      (data)=>{
        console.log(data);
        this.isUpdated = true;
        this.onGetMaterielsListByPage();
      },
      (error)=>{
        console.log(error);
      }
    );
    
  } */


  /* onUpdateUploadFile(file: File){
    console.log('Upload file ...');
    this.fileIsUploading = true;
    this.fileNameUpdated = null;
    this.materielService.upLoadFile(file).subscribe(
      (data) => {
        if (data != null){
          console.log('File data: '+JSON.stringify(data));
          this.fileDataUpdated = JSON.parse(JSON.stringify(data));
          this.fileNameUpdated = this.fileDataUpdated.fileName;
          console.log('fileNameUpdated: '+this.fileNameUpdated);
          this.fileIsUploading = true;
          //this.fileUploaded =true;
          if (this.fileNameUpdated){
            this.materielService.deleteFile(this.fileNameNoUpdated).subscribe(
              (resp)=>{
                console.log('Fichier <<'+this.fileNameNoUpdated+'>> Supprimé avec succès et remplacé par: '+this.fileNameUpdated);
              },
              (error) => console.log('Fichier non supprimé')
            );
          }

        }
      },
      (error) => {
        console.log(error);
      }
    );
  } */

  detectFile(event) {
    this.fileDetected = null;
    console.log('Detect File ...');
    console.log(event.target.files[0]);
    this.fileDetected = event.target.files[0];//fileDetected Example { name: "mixing.jpg", lastModified: 1557602638000, webkitRelativePath: "", size: 141197, type: "image/jpeg" }
    this.fileIsUploading = true;
    //this.onUpdateUploadFile(event.target.files[0]);
  }

  onChangeIsUpdated() {
    this.isUpdated = false;
    this.materiel = null;
    this.fileIsUploading = false;
    this.fileDetected = null;
  }

  get isAdmin() {
    let resp;
    let roles = this.currentUser.roleList;
    let i = 0;
    for (let role of roles) {
      if (role.roleName == RoleUtils.Admin) {
        resp = true;
        break;
      } else {
        resp = false;
      }
    }
    return resp;
  }


  onUpdateMateriel(materielToUpdate) {

    console.log('Upload File, Delete Old File and Update Materiel...');
    console.log('materielToUpdate: ' + JSON.stringify(materielToUpdate));
    console.log('this.fileNameNoUpdated ' + this.fileNameNoUpdated);
    this.materiel = new Materiel("", undefined, "", "");
    if (this.fileDetected){
      this.updateMaterielAndFile(materielToUpdate, this.fileDetected);
    }else{
      this.updateMaterielOnly(materielToUpdate);
    }
  }

  updateMaterielAndFile(materielToUpdate, file: File){
    //Upload File
    this.fileNameUpdated = null;
    this.materielService.upLoadFile(file).subscribe(
      (data) => {
        if (data != null) {
          console.log('Upload file ...');
          this.fileDataUpdated = JSON.parse(JSON.stringify(data));
          console.log('fileDataUpdated: ' + this.fileDataUpdated);
          this.fileNameUpdated = this.fileDataUpdated.fileName;
          console.log('fileNameUpdated: ' + this.fileNameUpdated);

          if (this.fileNameUpdated) {
            this.materielService.deleteFile(this.fileNameNoUpdated).subscribe(
              (resp) => {
                console.log('Delete File ...');
                console.log('Fichier <<' + this.fileNameNoUpdated + '>> Supprimé avec succès et remplacé par: ' + this.fileNameUpdated);
                this.updateMaterielOnly(materielToUpdate);
              },
              (error) => console.log('Fichier non supprimé')
            );
          }
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateMaterielOnly(materielToUpdate){
     //Update Materiel
     if (this.fileNameUpdated) {
      this.materiel.fileName = this.fileNameUpdated;
    } else {
      this.materiel.fileName = this.fileNameNoUpdated;
    }
    console.log('this.materiel.fileName ' + this.materiel.fileName);
    this.materiel.description = materielToUpdate.description;
    this.materiel.refMateriel = materielToUpdate.refMateriel;
    this.materiel.puMateriel = materielToUpdate.puMateriel;
    this.materiel.designMateriel = materielToUpdate.designMateriel;
    console.log(JSON.stringify(this.materiel));

    this.materielService.updateMateriel(this.materiel.refMateriel, this.materiel).subscribe(
      (data) => {
        console.log('Update Materiel ...')
        console.log(data);
        this.isUpdated = true;
        this.onGetMaterielsListByPage();
      },
      (error) => {
        console.log(error);
      }
    );
  }



}
