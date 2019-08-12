import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterielListComponent } from './materiel-list/materiel-list.component';
import { MaterielCreateComponent } from './materiel-create/materiel-create.component';
import { FileListComponent } from './file-list/file-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterielDetailsComponent } from './materiel-details/materiel-details.component';

const routes: Routes = [
  { path: 'materiels', component: MaterielListComponent },
  { path: 'login',  component: LoginComponent },
  { path: 'register',  component: RegisterComponent },
  { path: 'files',  component: FileListComponent },
  { path: 'materiels/new', component: MaterielCreateComponent },
  { path: 'materiels/view/:id', component: MaterielDetailsComponent },
  { path: '', redirectTo: 'materiels', pathMatch: 'full' },
  { path: '**', redirectTo: 'materiels' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }