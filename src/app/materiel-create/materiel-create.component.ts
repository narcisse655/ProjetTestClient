import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Materiel } from '../model/Materiel';
import { MaterielService } from '../service/materiel.service';

@Component({
  selector: 'app-materiel-create',
  templateUrl: './materiel-create.component.html',
  styleUrls: ['./materiel-create.component.css']
})
export class MaterielCreateComponent implements OnInit {

  materielForm: FormGroup;
  fileIsUploading = false;
  fileUploaded = false;
  dataFile: { id: "", fileName: "", fileType: "" };
  materiel: Materiel;
  fileId: string;

  constructor( private formBuilder: FormBuilder , private materielService: MaterielService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
      this.materielForm = this.formBuilder.group({
      designMateriel: ['', Validators.required],
      puMateriel: ['',  Validators.required]
    }); 
  }

  onSaveMateriel(){
    let fileId: string = '';
    const designation = this.materielForm.get('designMateriel').value;
    const pu = this.materielForm.get('puMateriel').value;
    const prix = parseFloat(pu);

    if (this.fileId && this.fileId !== ''){
      fileId = this.fileId;
      console.log('id photo: '+fileId+' designation: '+designation+' prix: '+prix);
    }

    this.materiel = new Materiel(designation, fileId, prix);
    
    console.log('createMateriel(): '+JSON.stringify(this.materiel));
    this.materielService.createMateriel(this.materiel).subscribe(
      data => console.log(data), error => console.log(error)
    );
    
    this.materiel = null;
    this.router.navigate(['materiels']);
  }

  onUploadFile(file: File){
    this.fileId = '';
    this.fileIsUploading = true;
    this.materielService.upLoadedFile(file).subscribe(
      (data) => {
        
        if (data != null){
          console.log('File is completely uploaded! data: ');
          this.dataFile = JSON.parse(JSON.stringify(data));
          this.fileId = this.dataFile.id;
          console.log('id du fichier: '+this.dataFile.id);

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

  onMateriels(){
    this.router.navigate(['materiels']);
  }

   /*  onUploadFile(file: File){
    this.fileIsUploading = true;
    this.materielService.upLoadedFile(file).subscribe(
      (event) => {
        if (event instanceof HttpResponse){
          console.log('File is completely uploaded! event: '+event);
          this.fileIsUploading = false;
          this.fileUploaded =true;
        }
      }
    );
  } */


}
