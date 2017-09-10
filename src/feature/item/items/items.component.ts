import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../service/item.service';
import { Item } from '../../../model/item.model';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'items-component',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
    items: Array<Item>;
    isLoading = true;
    placeholderImage = 'assets/image/placeholder.jpg';
    ngOnInit(): void {
        this.getItems();
    }
    constructor(private itemService: ItemService, private router: Router, private formBuilder: FormBuilder,
        private notification: NotificationsService) { }
    deactivate(e) {
        e.preventDefault();
        this.notification.success('Success', 'Item is deactivated');
    }
    getItems() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    console.log(e);
                    result.context.items = e.item;
                }
                result.context.isLoading = false;
            }
        };
        this.itemService.getItems(result);
    }
}
