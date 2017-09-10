import { CountdownComponent } from './../../sharedcomponent/countdown/countdown.component';

import { Component } from '@angular/core';





@Component({
    selector: 'homecontent-component',
    templateUrl: './homecontent.component.html',
    styleUrls: ['./homecontent.component.css']
})
export class HomeContentComponent {

    constructor() {

    }

    handle(e) {
        console.log(e.message);
    }
}
