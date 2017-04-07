import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Headers } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AlertModule } from 'ng2-bootstrap';
import { RouteAuth } from '../utility/route.auth';

// Component
import { HomeComponent } from '../feature/home/home.component';
import { LoginComponent } from '../feature/login/login.component';

import { AppComponent } from './app.component';
import { HttpHelper } from '../service/http.helper';
import { AuthenticationService } from '../service/authentication.service';
import { ProfileRepository } from '../repository/profile.repository';
import { ProfileService } from '../service/profile.service';
import { ICoreService } from '../service/icore.service';
import { IRepository } from '../repository/irepository';
import { ProfileComponent } from '../feature/profile/profile.component';
import { ObservableHelper } from '../utility/observable-helper';
import { RegisterComponent } from '../feature/register/register.component';
import { FooterComponent } from '../feature/footer/footer.component';
import { HeaderComponent } from '../feature/header/header.component';
import { AddressComponent } from '../feature/address/address.component';
import { AddressRepository } from '../repository/address.repository';
import { AddressService } from '../service/address.service';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {})
  ],
  providers: [
    RouteAuth,
    HttpHelper,
    AuthenticationService,
    ProfileRepository,
    ProfileService,
    ObservableHelper,
    AddressRepository,
    AddressService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
