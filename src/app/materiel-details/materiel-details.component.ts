import { Component, OnInit } from '@angular/core';
import { Materiel } from '@app/model/Materiel';
import { MaterielService } from '@app/_services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-materiel-details',
  templateUrl: './materiel-details.component.html',
  styleUrls: ['./materiel-details.component.css']
})
export class MaterielDetailsComponent implements OnInit {

  materiel: Materiel;
  fileName: string;
  constructor(private materielService: MaterielService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.materiel = new Materiel('',undefined,'','');
    const id = this.route.snapshot.params['id'];
    this.materielService.getMateriel(id).subscribe(
      (materiel)=>{ 
        this.materiel = materiel;
        /* let name = this.materiel.fileName;
        let splitChaine = name.split('.');
        this.fileName = splitChaine[0]; */
      },
      (error)=>{
        console.log(error.error.message);
      }
    );
  }

  goToMateriels(){
    this.router.navigate(['/materiels']);
  }

}
