import { Component, OnInit } from '@angular/core';
import { HttpHelper } from '../../service/http.helper';
import { profilePath, loginPath } from '../../utility/link';
import 'rxjs/add/operator/map';
import { ObservableHelper } from '../../utility/observable-helper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { NotificationsService } from 'angular2-notifications';



@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    isWorking = false;
    loginForm: FormGroup;
    returnUrl: string;
    ngOnInit(): void {
        if (!this.authService.isTokenExpired()) {
            this.router.navigate(['']);
        }

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]]
        });
    }


    constructor(private authService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
        private notification: NotificationsService, private httpHelper: HttpHelper, private observableHelper: ObservableHelper,
        private route: ActivatedRoute) {
        // this.getProfile();
    }

    login(e) {
        const context = this;
        context.isWorking = true;
        e.preventDefault();
        const body = JSON.stringify(this.loginForm.value);
        this.observableHelper.processObservable(this.httpHelper.post(loginPath, body), function (data) {
            localStorage.setItem('token', JSON.stringify(data.json()));
            context.isWorking = false;
            context.notification.success(
                'Success',
                'You have succesfully logged in.',
                {
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true,
                    timeOut: 3000,
                }
            );
            context.router.navigateByUrl(context.returnUrl);
        }, function (data) {
            context.isWorking = false;
            context.notification.error(
                'Error',
                'There was a problem, please try again later.',
                {
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true,
                    timeOut: 3000,
                }
            );
        }, function (data) {
            context.isWorking = false;
        });
    }


    getProfile() {
        this.observableHelper.processObservable(this.httpHelper.get(profilePath), function (data) {
            console.log(data.json());
        }, null, null);
    }

    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }

}
