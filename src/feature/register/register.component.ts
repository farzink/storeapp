import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { RegisterModel } from '../../model/register.model';
import { HttpHelper } from '../../service/http.helper';
import { ObservableHelper } from '../../utility/observable-helper';
import { registerationPath } from '../../utility/link';
import 'rxjs/add/operator/debounceTime';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerationForm: FormGroup;
    emailMessage: string;
    isWorking = false;
    constructor(private formBuilder: FormBuilder, private httpHelper: HttpHelper,
        private notification: NotificationsService, private observableHelper: ObservableHelper, private router: Router) {
    }
    register() {
        const context = this;
        context.isWorking = true;
        const body = JSON.stringify(this.registerationForm.value);
        this.observableHelper.processObservable(this.httpHelper.post(registerationPath, body), function (data) {
            localStorage.setItem('registrationResult', JSON.stringify(data.json()));
            context.notification.success(
                'Success',
                'Your account has been created.',
                {
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: true,
                    timeOut: 3000,
                }
            );
            context.router.navigate(['/authentication/login']);
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
    ngOnInit(): void {
        this.registerationForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(2)]],
            lastName: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            // confirmPassword: ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    get email() { return this.registerationForm.get('email'); }
    get password() { return this.registerationForm.get('password'); }
    get firstName() { return this.registerationForm.get('firstName'); }
    get lastName() { return this.registerationForm.get('lastName'); }
    // get confirmPassword() { return this.registerationForm.get('confirmPassword'); }

}
