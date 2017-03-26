import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';




@Injectable()
export class HttpHelper {    
    constructor(private http: Http, private authService: AuthenticationService){        
    }
    
    get(url){      
      return this.http.get(url,
      {
          headers: this.authService.prepareHeaders()
      });
    }
    post(url, params){        
        return this.http.post(url,
        params,
        {
            headers: this.authService.prepareHeaders()
        });
    }

    processObservable(source: Observable<any>, subscriber, error, completion){
        source.subscribe(function(e){
            subscriber(e);            
        }, function(e){

        }, function(){

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
//           console.log(error.text());
//         }
//       );
