import { Component, Input } from '@angular/core';
@Component({
    selector: 'app-pagination-component',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
    @Input() currentIndex = 0;
    @Input() hasNext = false;
    @Input() hasPrevious = false;
    @Input() size = 12;
    @Input() maxNumberOfPageButtons = 5;
    @Input() total = 0;
    @Input() numberOfPages: any = [];
    @Input() route: string;
    @Input() selected: string;         
}
