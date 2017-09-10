import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';



@Component({
    selector: 'home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    selected: string;
    constructor(public http: Http) {

    }

    observableSource = (keyword: any): Observable<any[]> => {
        let url: string =
            'http://localhost:54434/api/home/suggestion/' + keyword;
        if (keyword) {
            return this.http.get(url).map(res => {
                console.log(res.json());
                const json = res.json();
                return json.results;
            });
        } else {
            return Observable.of([]);
        }
    }

    search() {
        alert(this.selected);
    }

    keypressed(e) {
        if (e.keyCode === 13 && this.selected !== '') {
            this.search();
        }
    }
}
