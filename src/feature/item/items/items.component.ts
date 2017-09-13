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
    filteredItems: Array<Item>;
    isLoading = true;
    maxNumberOfItemsToDisplay = 50;
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
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.items = e.item;
                    result.context.assignCopy();
                }
                result.context.isLoading = false;
            },
            error(e) {
                this.notification.error('Error', 'Could not load your items. please try again later');
            },
            complete(e) {
                result.context.isLoading = false;
            }
        };
        this.itemService.getItems(result);
    }

    assignCopy() {
        this.filteredItems = Object.assign([], this.items);
    }

    filterItems(value) {
        if (!value) { this.assignCopy(); }
        this.filteredItems = Object.assign([], this.items).filter(
            item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        );
    }
}
