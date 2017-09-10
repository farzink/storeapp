import { AuthenticationService } from './../service/authentication.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options = {
    position: ['top', 'right'],
    timeOut: 3000,
    animate: 'scale',
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };
  isAuthorized: Boolean;
  constructor(private authService: AuthenticationService) {
    this.isAuthorized = this.authService.isTokenExpired();
  }
  title = 'app works!';
}
