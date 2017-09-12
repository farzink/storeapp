import { CategoryService } from './../service/category.service';
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
  constructor(private authService: AuthenticationService, private categoryService: CategoryService) {
    this.isAuthorized = this.authService.isTokenExpired();

    this.categoryService.getAllBusinessCategories({satisfy: function(e){}});
    this.categoryService.getAllItemCategories({satisfy: function(e){}});
  }
  title = 'app works!';
}
