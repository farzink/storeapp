import { Component, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl  } from '@angular/forms';
import { RegisterModel } from '../../model/register.model';
import { HttpHelper } from '../../service/http.helper';
import { ObservableHelper } from '../../utility/observable-helper';
import { registerationPath } from '../../utility/link';
import 'rxjs/add/operator/debounceTime';


@Component({
    selector: 'register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerationForm: FormGroup;
    emailMessage: string;
    constructor(private formBuilder: FormBuilder, private httpHelper: HttpHelper, private observableHelper: ObservableHelper){
    }
    register(){
        let body = JSON.stringify(this.registerationForm.value);
        this.observableHelper.processObservable(this.httpHelper.post(registerationPath, body), function (data) {
             localStorage.setItem("registrationResult", JSON.stringify(data.json()));
        }, null, null);
    }
    ngOnInit(): void {
        this.registerationForm=this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(4)]],
            lastName: '',
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
            password: ''
        });

        const emailControl = this.registerationForm.get('email');
        emailControl.valueChanges.debounceTime(4000).subscribe(value =>
            this.setMessage(emailControl));
    }


setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            this.emailMessage = Object.keys(c.errors).map(key =>
                this.validationMessages[key]).join(' ');
        }
    }


    private validationMessages = {
        email: 'Please enter your first name',
        pattern: 'Please enter a valid email address.'
    };
}