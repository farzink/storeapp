import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../service/item.service';
import { Item } from '../../../model/item.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ImageComponent } from '../../image/image.component';
import { Image } from '../../../model/image.model';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'edititeminfo-component',
    templateUrl: './edititeminfo.component.html',
    styleUrls: ['./edititeminfo.component.css']
})
export class EditItemInfoComponent implements OnInit {
    // @ViewChild('file') fileElement:ElementRef;
    item: Item;
    itemForm: FormGroup;
    itemId: number;
    images: Array<Image>;
    isLoadingInfo = true;
    isLoadingImages = true;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
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
            weight: ['', [Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            height: ['', [Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            width: ['', [Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            feature: [''],
            detail: [''],
            processingTime: [''],
            cost: ['', [Validators.pattern(/^(\d*\.\d{1,2}|\d+)$/)]],
            hasFreeShipping: [''],
            location: [''],
            hasLocalPickup: [''],
            carrier: [''],
        });
        this.getItem(this.itemId);
        this.getImages();
    }
    constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router,
        private formBuilder: FormBuilder, private notification: NotificationsService) { }
    update(e) {
        e.preventDefault();
        console.log(this.isLoadingInfo);
        this.isLoadingInfo = true;
        console.log(this.isLoadingInfo);
        const result = {
            context: this,
            success(d) {
                if (d.statusCode === 202) {
                    result.context.notification.success(
                        'Success',
                        'Item has been updated successfully',
                        {
                            showProgressBar: true,
                            pauseOnHover: true,
                            clickToClose: true,
                            timeOut: 3000
                        }
                    );
                }
            }
        };
        this.itemService.update(this.itemForm.value, result);
        result.context.isLoadingInfo = false;
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
                    result.context.itemForm.patchValue({ height: e.item.height });
                    result.context.itemForm.patchValue({ width: e.item.width });
                    result.context.itemForm.patchValue({ weight: e.item.weight });
                    result.context.itemForm.patchValue({ feature: e.item.feature });
                    result.context.itemForm.patchValue({ detail: e.item.detail });
                    result.context.itemForm.patchValue({ processingTime: e.item.processingTime });
                    result.context.itemForm.patchValue({ cost: e.item.cost });
                    result.context.itemForm.patchValue({ carrier: e.item.carrier });
                    result.context.itemForm.patchValue({ hasFreeShipping: e.item.hasFreeShipping });
                    result.context.itemForm.patchValue({ hasLocalPickup: e.item.hasLocalPickup });
                    result.context.itemForm.patchValue({ location: e.item.location });
                    result.context.isLoadingInfo = false;
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
    get weight() { return this.itemForm.get('weight'); }
    get height() { return this.itemForm.get('height'); }
    get width() { return this.itemForm.get('width'); }
    get feature() { return this.itemForm.get('feature'); }
    get detail() { return this.itemForm.get('detail'); }
    get processingTime() { return this.itemForm.get('processingTime'); }
    get cost() { return this.itemForm.get('cost'); }
    get hasFreeShipping() { return this.itemForm.get('hasFreeShipping'); }
    get location() { return this.itemForm.get('location'); }
    get hasLocalPickup() { return this.itemForm.get('hasLocalPickup'); }
    get carrier() { return this.itemForm.get('carrier'); }
}
