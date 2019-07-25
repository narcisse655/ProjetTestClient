import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterielListComponent } from './materiel-list/materiel-list.component';
import { MaterielCreateComponent } from './materiel-create/materiel-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'materiels', pathMatch: 'full' },
  { path: 'materiels', component: MaterielListComponent },
  { path: 'materiels/new', component: MaterielCreateComponent },
  { path: '**', redirectTo: 'materiels' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }