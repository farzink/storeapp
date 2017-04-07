import { Component, OnInit } from '@angular/core';
import { HttpHelper } from '../../service/http.helper';
import { profilePath, loginPath } from '../../utility/link';
import 'rxjs/add/operator/map';
import { ObservableHelper } from '../../utility/observable-helper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';



@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    ngOnInit(): void {
        if (!this.authService.isTokenExpired()) {
            this.router.navigate(['']);
        }
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password: ''
        });
    }


    constructor(private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder, private httpHelper: HttpHelper, private observableHelper: ObservableHelper) {
        //this.getProfile();
    }

    login(e) {
        var context = this;
        e.preventDefault();
        let body = JSON.stringify(this.loginForm.value);
        this.observableHelper.processObservable(this.httpHelper.post(loginPath, body), function (data) {
            localStorage.setItem("token", JSON.stringify(data.json()));
            context.router.navigate(['']);
        }, null, null);
    }


    getProfile() {
        this.observableHelper.processObservable(this.httpHelper.get(profilePath), function (data) {
            console.log(data.json());
        }, null, null);
    }
}