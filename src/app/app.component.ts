import { AuthenticationService } from './../service/authentication.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthorized: Boolean;
  constructor(private authService: AuthenticationService) {
    this.isAuthorized = this.authService.isTokenExpired();
  }
  title = 'app works!';
}
