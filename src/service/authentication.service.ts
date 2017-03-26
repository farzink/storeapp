import { Http, Headers } from '@angular/http';
import { loginPath } from '../utility/link';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {
    }
    prepareHeaders() {
        var headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        var token = (JSON.parse(localStorage.getItem("token")) != null) ? JSON.parse(localStorage.getItem("token")).token : "";
        headers.append('Authorization', 'Bearer ' + token);
        return headers;
    }
    getToken(username, password) {
        return (JSON.parse(localStorage.getItem("token")) != null) ? JSON.parse(localStorage.getItem("token")).token : "";
    }
    getExpirationDate() {
        var token = (JSON.parse(localStorage.getItem("token")));
        return new Date(token.expiration);
    }
    isTokenExpired() {
        var token = (JSON.parse(localStorage.getItem("token")));
        if (((token != null) ? token.expiration : "") == "")
            return true;
        else {
            if (new Date(token.expiration) < new Date())
                return true;
        }
        return false;
    }
}


// let body = JSON.stringify({ username, password });
//     this.http.post('http://localhost:3001/sessions/create', body, { headers: contentHeaders })
//       .subscribe(
//         response => {
//           localStorage.setItem('id_token', response.json().id_token);
//           this.router.navigate(['home']);
//         },
//         error => {
//           alert(error.text());
//           console.log(error.text());
//         }
//       );
