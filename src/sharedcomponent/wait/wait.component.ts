import { Component, Input } from '@angular/core';
@Component({
    selector: 'wait-component',
    templateUrl: './wait.component.html',
    styleUrls: ['./wait.component.css']
})
export class WaitComponent {
    @Input() isActive: boolean;
    @Input() message: string;
}
