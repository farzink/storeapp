import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../../../service/item.service';
import { NotificationsService } from 'angular2-notifications';
import { OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent } from 'angular-star-rating/star-rating-struct';



@Component({
    selector: 'app-itemdetail-component',
    templateUrl: './itemdetail.component.html',
    styleUrls: ['./itemdetail.component.css']
})
export class ItemDetailComponent implements OnInit {
    item: any;
    isLoading = true;
    itemId;
    onRatingChangeResult: OnRatingChangeEven;
    ngOnInit(): void {

    }
    constructor(private itemService: ItemService, private route: ActivatedRoute,
        private notification: NotificationsService) {
        this.route.params.subscribe(val => {
            this.itemId = (+this.route.snapshot.params['id'] || 0);
            this.getItems();
        });
    }
    getItems() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    console.log(e.item);
                    result.context.item = e.item;
                }
                result.context.isLoading = false;
            },
            error(e) {
                console.log(e, 'error');
            }
        };
        this.itemService.getItemDetail(result.context.itemId, result);
    }

    onRatingChange = ($event: OnRatingChangeEven) => {
        console.log('onRatingUpdated $event: ', $event);
        this.onRatingChangeResult = $event;
    };
}
