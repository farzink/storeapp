import { CategoryService } from './../../../service/category.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../service/item.service';
import { Item } from '../../../model/item.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ImageComponent } from '../../image/image.component';
import { Image } from '../../../model/image.model';
import { NotificationsService } from 'angular2-notifications';
declare var $: any;

@Component({
    selector: 'edititeminfo-component',
    templateUrl: './edititeminfo.component.html',
    styleUrls: ['./edititeminfo.component.css']
})
export class EditItemInfoComponent implements OnInit {
    // @ViewChild('file') fileElement:ElementRef;
    item: Item;
    itemForm: FormGroup;
    shippingForm: FormGroup;
    sizeForm: FormGroup;
    itemId: number;
    images: Array<Image>;
    isLoadingInfo = true;
    isLoadingSize = false;
    isLoadingShipping = false;
    isLoadingImages = true;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    categories = [];
    ngOnInit(): void {
        const context = this;
        this.itemId = +this.route.snapshot.parent.url[this.route.snapshot.parent.url.length - 1].path;
        this.images = new Array<Image>();
        this.itemForm = this.formBuilder.group({
            id: context.itemId,
            title: ['', [Validators.required, Validators.minLength(4)]],
            name: ['', [Validators.required, Validators.minLength(4)]],
            description: '',
            price: ['', [Validators.required, Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            manufacturer: ['', [Validators.required, Validators.minLength(4)]],
            manufacturingType: '',
            quantity: ['', [Validators.required, Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            material: [''],
            brand: [''],
            feature: [''],
            detail: [''],
            itemCategoryId: '',
            isActive: ['']
        });
        this.shippingForm = this.formBuilder.group({
            id: context.itemId,
            processingTime: [''],
            shippingCost: ['', [Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            hasFreeShipping: [''],
            hasLocalPickup: [''],
            carrier: [''],
            location: [''],
        });
        this.sizeForm = this.formBuilder.group({
            id: context.itemId,
            weight: ['', [Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            height: ['', [Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            width: ['', [Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
        });
        this.getItem(this.itemId);

        this.getImages();
    }
    constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router,
        private formBuilder: FormBuilder, private notification: NotificationsService, private categoryService: CategoryService) { }
    update(e) {
        e.preventDefault();
        const tempCategory: any = document.getElementsByClassName('categorySelect')[0];
        // const tempManufacturer: any = document.getElementsByClassName('manufactureType')[0];
        const selectedCategory = tempCategory.value;
        // const selectedManufacturingType = tempManufacturer.value;
        this.itemForm.patchValue({ itemCategoryId: selectedCategory });
        this.isLoadingInfo = true;
        const result = {
            context: this,
            success(d) {
                if (d.statusCode === 202) {
                    result.context.notification.success(
                        'Success',
                        'Item has been updated successfully'
                    );
                }
            }
        };
        this.itemService.update(this.itemForm.value, result);
        result.context.isLoadingInfo = false;
    }

    updateShipping(e) {
        e.preventDefault();
        this.isLoadingShipping = true;

        const result = {
            context: this,
            success(d) {
                if (d.statusCode === 202) {
                    result.context.notification.success(
                        'Success',
                        'Item has been updated successfully'
                    );
                }
            }
        };
        this.itemService.updateShippingInfo(this.shippingForm.value, result);
        result.context.isLoadingShipping = false;
    }
    updateSize(e) {
        e.preventDefault();
        this.isLoadingSize = true;
        const result = {
            context: this,
            success(d) {
                if (d.statusCode === 202) {
                    result.context.notification.success(
                        'Success',
                        'Item has been updated successfully'
                    );
                }
            }
        };
        this.itemService.updateSize(this.sizeForm.value, result);
        result.context.isLoadingSize = false;
    }
    getItem(id) {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.item = e.item;
                    result.context.itemForm.patchValue({ title: e.item.title });
                    result.context.itemForm.patchValue({ price: e.item.price });
                    result.context.itemForm.patchValue({ name: e.item.name });
                    result.context.itemForm.patchValue({ quantity: e.item.quantity });
                    result.context.itemForm.patchValue({ manufacturer: e.item.manufacturer });
                    result.context.itemForm.patchValue({ manufacturingType: e.item.manufacturingType });
                    result.context.itemForm.patchValue({ description: e.item.description });
                    result.context.itemForm.patchValue({ brand: e.item.brand });
                    result.context.itemForm.patchValue({ material: e.item.material });
                    result.context.itemForm.patchValue({ feature: e.item.feature });
                    result.context.itemForm.patchValue({ detail: e.item.detail });
                    result.context.itemForm.patchValue({ isActive: e.item.isActive });

                    result.context.sizeForm.patchValue({ height: e.item.height });
                    result.context.sizeForm.patchValue({ width: e.item.width });
                    result.context.sizeForm.patchValue({ weight: e.item.weight });

                    result.context.shippingForm.patchValue({ processingTime: e.item.processingTime });
                    result.context.shippingForm.patchValue({ shippingCost: e.item.shippingCost });
                    result.context.shippingForm.patchValue({ carrier: e.item.carrier });
                    result.context.shippingForm.patchValue({ hasFreeShipping: e.item.hasFreeShipping });
                    result.context.shippingForm.patchValue({ hasLocalPickup: e.item.hasLocalPickup });
                    result.context.shippingForm.patchValue({ location: e.item.location });
                    result.context.isLoadingInfo = false;
                    const interested = {
                        context: this,
                        satisfy(d) {
                            result.context.categories = d;
                            $('.categorySelect').empty();
                            for (const i of d) {
                                if (result.context.item.itemCategoryId === i.id) {
                                    $('.categorySelect').append(`<option value="${i.id}" selected="true">${i.name}</option>`);
                                } else {
                                    $('.categorySelect').append(`<option value="${i.id}">${i.name}</option>`);
                                }
                            }
                            $('.select-drop').selectbox('detach');
                            $('.select-drop').selectbox('attach');
                        }
                    };
                    result.context.categoryService.getAllItemCategories(interested);


                }
            }
        };
        this.itemService.getById(id, result);
    }
    navigate() {
        this.router.navigateByUrl('/(image)');
    }
    getImages() {
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    e.item.map(i => {
                        result.context.images.push(new Image(i));
                    });
                    result.context.isLoadingImages = false;
                }
            }
        };
        this.itemService.getImages(this.itemId, result);
    }
    addImage(e) {
        e.preventDefault();
        this.images.push(new Image({
            path: 'assets/image/', name: 'placeholder.jpg',
            id: -1
        }));
    }

    get title() { return this.itemForm.get('title'); }
    get name() { return this.itemForm.get('name'); }
    get price() { return this.itemForm.get('price'); }
    get description() { return this.itemForm.get('description'); }
    get manufacturer() { return this.itemForm.get('manufacturer'); }
    get manufacturingType() { return this.itemForm.get('manufacturingType'); }
    get quantity() { return this.itemForm.get('quantity'); }
    get material() { return this.itemForm.get('material'); }
    get brand() { return this.itemForm.get('brand'); }
    get weight() { return this.sizeForm.get('weight'); }
    get height() { return this.sizeForm.get('height'); }
    get width() { return this.sizeForm.get('width'); }
    get feature() { return this.itemForm.get('feature'); }
    get detail() { return this.itemForm.get('detail'); }
    get processingTime() { return this.shippingForm.get('processingTime'); }
    get shippingCost() { return this.shippingForm.get('shippingCost'); }
    get hasFreeShipping() { return this.shippingForm.get('hasFreeShipping'); }
    get location() { return this.shippingForm.get('location'); }
    get hasLocalPickup() { return this.shippingForm.get('hasLocalPickup'); }
    get carrier() { return this.shippingForm.get('carrier'); }
    get isActive() { return this.itemForm.get('isActive'); }
}
