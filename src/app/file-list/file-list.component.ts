import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Materiel } from '../model/Materiel';
import { MaterielService } from '@app/_services';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  files: any = [];
  imagesExist: boolean = false;
  materiels: Observable<Materiel[]>
  name: string;

  constructor(private materielService: MaterielService, private router: Router) { }

  ngOnInit() { 
    //service pour charger directement les fichiers du système
    /* this.materielService.getFiles().subscribe(
      (response) => {
        this.imagesExist = true;
        this.files = response;
      },
      (error) => {
        console.log(error);
      }
    );
   */
    this.materielService.getMaterielsList().subscribe(
      (data) => {
        this.imagesExist = true;
        this.materiels = data;
      }
    );
  }

  onMateriels(){
    this.router.navigate(['materiels']);
  }

}
