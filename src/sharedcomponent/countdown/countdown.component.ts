import { Observable, TimeInterval, Subscription } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'app-countdown-component',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.css']
})
export class CountdownComponent {
    @Input() endDate: any;
    @Input() message: string;
    @Output() expired: EventEmitter<any> = new EventEmitter();
    day = 0;
    hour = 0;
    minute = 0;
    second = 0;
    daySeconds = 86400;
    hourSeconds = 3600;
    minuteSecond = 60;
    observable: Subscription;
    constructor() {
        this.observable = Observable.timer(1000, 1000).subscribe(t => {
            this.run();
            this.getTimeRemaining();
        });
    }

    run() {
        const now = Date.now();
        // const test = Date.parse('Thu, 07 Sep 2017 19:31:35');
        // const test = Date.parse('9-7-2017 19:33:35');
        const diff = Date.parse(this.endDate) - now;
        let res = Math.ceil(diff / 1000);
        // console.log(res, 'res');

        if (res >= this.daySeconds) {
            this.day = Math.floor(res / this.daySeconds);
            res = res % this.daySeconds;
        }

        if (res >= this.hourSeconds) {
            this.hour = Math.floor(res / this.hourSeconds);
            res = res % this.hourSeconds;
        }

        if (res >= this.minuteSecond) {
            this.minute = Math.floor(res / this.minuteSecond);
            res = res % this.minuteSecond;
        }
        this.second = res;
        if (diff <= 0) {
            this.observable.unsubscribe();
            this.expired.emit({
                code: 0,
                message: 'expired officially'
            });
        }

    }

    getTimeRemaining() {
        const now = Date.now();
        const t = Date.parse(this.endDate) - now;
        const seconds = Math.floor((t / 1000) % 60);
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const days = Math.floor(t / (1000 * 60 * 60 * 24));

        // console.log(t, '=> t, ', seconds, '=> seconds, ', minutes, '=> minutes, ', hours, '=> hours, ', days);
    }
}


