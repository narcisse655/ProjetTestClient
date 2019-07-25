import { Component, OnInit, Input } from '@angular/core';
import { MaterielService } from '../service/materiel.service';
import { Observable } from 'rxjs';
import { Materiel } from '../model/Materiel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materiel-list',
  templateUrl: './materiel-list.component.html',
  styleUrls: ['./materiel-list.component.css']
})
export class MaterielListComponent implements OnInit {

  materiels: Observable<Materiel[]>
  public id: number;
  imageExist: boolean = false;

  constructor(private materielService: MaterielService, private router: Router) { }

  ngOnInit() {
    this.materiels = this.materielService.getMaterielsList();
  }

  showImageMateriel(id:number){
    if (id!=null){
      this.imageExist = true;
    }
    this.id = id;
    console.log('showImageMateriel('+id+'): id = '+id);
  }

  onNewMateriel(){
    this.router.navigate(['/materiels', 'new']);
  }

}
