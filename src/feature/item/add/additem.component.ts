import { CategoryService } from './../../../service/category.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../service/item.service';
import { NotificationsService } from 'angular2-notifications';
declare var $: any;

@Component({
    selector: 'additem-component',
    templateUrl: './additem.component.html',
    styleUrls: ['./additem.component.css']
})
export class AddItemComponent implements OnInit {
    // @ViewChild('file') fileElement:ElementRef;
    itemForm: FormGroup;
    isLoading = false;
    categories = [];
    selectedCategory;
    ngOnInit(): void {
        const interested = {
            context: this,
            satisfy(e) {
                interested.context.categories = e;
                $('.categorySelect').empty();
                for (const i of e) {
                    $('.categorySelect').append(`<option value="${i.id}">${i.name}</option>`);
                }
                $('.select-drop').selectbox('detach');
                $('.select-drop').selectbox('attach');
            }
        };
        this.categoryService.getAllItemCategories(interested);


        this.itemForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(4)]],
            name: ['', [Validators.required, Validators.minLength(4)]],
            description: '',
            price: ['', [Validators.required, Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            manufacturer: ['', [Validators.required, Validators.minLength(4)]],
            manufacturingType: '',
            quantity: ['', [Validators.required, Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            itemCategoryId: '',
        });
    }
    constructor(private itemService: ItemService, private categoryService: CategoryService, private notification: NotificationsService,
        private router: Router, private formBuilder: FormBuilder) { }
    add(ev) {
        ev.preventDefault();
        // this.isLoading = true;
        const tempCategory: any = document.getElementsByClassName('categorySelect')[0];
        const tempManufacturer: any = document.getElementsByClassName('manufactureType')[0];
        this.selectedCategory = tempCategory.value;
        const selectedManufacturingType = tempManufacturer.value;
        this.itemForm.patchValue({ itemCategoryId: this.selectedCategory });
        this.itemForm.patchValue({ manufacturingType: this.selectedCategory });

        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 201) {
                    result.context.notification.success(
                        'Success',
                        'Item has been created.'
                    );
                    // result.context.router.navigate(['/home/business/manage/item/edit/', { queryParams: { id: e.item.id}}]);
                    result.context.isLoading = false;
                    result.context.router.navigate(['/profile/business/manage/item/edit', e.item.id]);
                }
            }
        };
        this.itemService.add(this.itemForm.value, result);


    }

    get title() { return this.itemForm.get('title'); }
    get name() { return this.itemForm.get('name'); }
    get price() { return this.itemForm.get('price'); }
    get description() { return this.itemForm.get('description'); }
    get manufacturer() { return this.itemForm.get('manufacturer'); }
    get manufacturingType() { return this.itemForm.get('manufacturingType'); }
    get quantity() { return this.itemForm.get('quantity'); }

}
