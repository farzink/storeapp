import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';




@Injectable()
export class HttpHelper {
    constructor(private http: Http, private authService: AuthenticationService) {
    }
    delete(url) {
        return this.http.delete(url,
            {
                headers: this.authService.prepareHeaders()
            });
    }
    get(url) {
        return this.http.get(url,
            {
                headers: this.authService.prepareHeaders()
            });
    }
    post(url, params) {
        return this.http.post(url,
            params,
            {
                headers: this.authService.prepareHeaders()
            });
    }
    put(url, params) {
        return this.http.put(url,
            params,
            {
                headers: this.authService.prepareHeaders()
            });
    }
    postFormData(url, params) {
        return this.http.post(url,
            params,
            {
                headers: this.authService.prepareFormDataHeaders()
            });
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

//         }
//       );
