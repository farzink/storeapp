import { Http } from '@angular/http';

export class AuthenticationService {


    constructor(private http: Http){
    }
    login(username, password){

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