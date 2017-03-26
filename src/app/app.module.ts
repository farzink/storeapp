import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Headers } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { RouteAuth } from '../utility/route.auth'

//Component
import { HomeComponent } from '../feature/home/home.component';
import { LoginComponent } from '../feature/login/login.component';

import { AppComponent } from './app.component';
import { HttpHelper } from '../service/http-helper';
import { AuthenticationService } from '../service/authentication.service';
import { ProfileRepository } from '../repository/profile-repository';
import { ProfileService } from '../service/profile-service';
import { ICoreService } from '../service/icore-service';
import { IRepository } from '../repository/irepository';
import { ProfileComponent } from '../feature/profile/profile.component';
import { ObservableHelper } from '../utility/observable-helper';


@NgModule({
  declarations: [    
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProfileComponent  
  ],
  imports: [    
    BrowserModule,
    FormsModule,
    HttpModule,           
    RouterModule.forRoot(routes, {     
    })
  ],
  providers: [    
    RouteAuth,
    HttpHelper,
    AuthenticationService,
    ProfileRepository,
    ProfileService,
    ObservableHelper    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
