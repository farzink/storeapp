import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';

import { RouteAuth } from '../utility/route.auth'

//Component
import { HomeComponent } from '../feature/home/home.component';
import { LoginComponent } from '../feature/login/login.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, {     
    })
  ],
  providers: [
    RouteAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
