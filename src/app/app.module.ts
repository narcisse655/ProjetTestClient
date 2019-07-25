import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MaterielCreateComponent } from './materiel-create/materiel-create.component';
import { MaterielListComponent } from './materiel-list/materiel-list.component';
import { MaterielDetailsComponent } from './materiel-details/materiel-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { MaterielService } from './service/materiel.service';

@NgModule({
  declarations: [
    AppComponent,
    MaterielCreateComponent,
    MaterielListComponent,
    MaterielDetailsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [MaterielService],
  bootstrap: [AppComponent]
})
export class AppModule { }