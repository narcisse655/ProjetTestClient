import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Materiel } from '../model/Materiel';
import { MaterielService } from '@app/_services';
import { MaterielListComponent } from '@app/materiel-list/materiel-list.component';


@Component({
  selector: 'app-materiel-create',
  templateUrl: './materiel-create.component.html',
  styleUrls: ['./materiel-create.component.css']
})
export class MaterielCreateComponent implements OnInit {

  materielForm: FormGroup;
  fileIsUploading = true;
  fileUploaded = false;
  fileData:  {fileName:"", fileDownloadUri:"", fileType:"", size:undefined};
  materiel: Materiel= new Materiel("", undefined, "", "");
  fileName: string;

  constructor( private formBuilder: FormBuilder , 
    private materielService: MaterielService,
    private materielList: MaterielListComponent,
    private router: Router) { }

  ngOnInit() {
    console.log('MaterielCreateComponent is create');
    this.initForm();
  }

  initForm(){
      this.materielForm = this.formBuilder.group({
      designMateriel: ['', Validators.required],
      puMateriel: ['',  Validators.required],
      description: ['']
    }); 
  }

  onNewMateriel(){
    const designation = this.materielForm.get('designMateriel').value;
    const pu = this.materielForm.get('puMateriel').value;
    const prix = parseFloat(pu);
    const description = this.materielForm.get('description').value;
    this.materiel.designMateriel = designation;
    this.materiel.puMateriel = prix;
    this.materiel.description = description;
    if (this.fileName !=='' && this.fileName !== null){
      this.materiel.fileName = this.fileName;
    }
    console.log('designation: '+designation+' prix: '+prix+' fileName: '+this.fileName+' description: '+description);

    this.materielService.newMateriel(this.materiel).subscribe(
      data => console.log('Nouveau materiel: '+JSON.stringify(data)), error => console.log(error)
    );
    //this.materielService.getMaterielsList();
    this.router.navigate(['materiels']);
    this.materielList.ngOnInit();

  }

  onUploadFile(file: File){

    this.fileIsUploading = true;
    this.materielService.upLoadFile(file).subscribe(
      (data) => {
        if (data != null){
          console.log('File data: '+JSON.stringify(data));
          this.fileData = JSON.parse(JSON.stringify(data));
          this.fileName = this.fileData.fileName;
          console.log('fileName: '+this.fileName);
          this.fileIsUploading = false;
          this.fileUploaded =true;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  detectFile(event){
    this.onUploadFile(event.target.files[0]);
  }

  goToMateriels(){
    this.router.navigate(['materiels']);
  }


}
