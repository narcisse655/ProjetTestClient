import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterielCreateComponent } from './materiel-create/materiel-create.component';
import { MaterielListComponent } from './materiel-list/materiel-list.component';
import { MaterielDetailsComponent } from './materiel-details/materiel-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FileListComponent } from './file-list/file-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterielService, AuthenticationService, UsersService } from './_services';
import { AuthInterceptor, MoneyPipe, SecurePipe, ErrorInterceptor, UsersStatutPipe } from './_helpers';
import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterielCreateComponent,
    MaterielListComponent,
    MaterielDetailsComponent,
    HeaderComponent,
    FileListComponent,
    LoginComponent,
    RegisterComponent,
    MoneyPipe,
    SecurePipe,
    UsersStatutPipe,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [MaterielService, AuthenticationService, UsersService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }