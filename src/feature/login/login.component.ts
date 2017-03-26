import { Component } from '@angular/core';
import { HttpHelper } from '../../service/http-helper';
import { profilePath, loginPath } from '../../utility/link';
import 'rxjs/add/operator/map';



@Component({
    selector: 'login-component',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    private rememberMe=false;
    constructor(private httpHelper: HttpHelper){
        //this.getProfile();
    }

    login(e){
        //e.preventDefault();        
        //let body = JSON.stringify({ username, password, });
        let body = JSON.stringify({
            email: "farzin@ieisys.com",
            password: "@farziN12",
            rememberMe: this.rememberMe
        });
        console.log(body);      
        this.httpHelper.processObservable(this.httpHelper.post(loginPath, body), function(data){
            localStorage.setItem("token", JSON.stringify(data.json()));            
        }, null, null);   
    }

    
    getProfile(){        
        this.httpHelper.processObservable(this.httpHelper.get(profilePath), function(data){
            console.log(data.json());
        }, null, null);       
    }
}