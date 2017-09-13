import { NotificationsService } from 'angular2-notifications';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from "ngx-gallery";
import { ItemService } from '../../service/item.service';
import { Item } from '../../model/item.model';
import { Image } from '../../model/image.model';
import { baseFilePath } from '../../utility/link';


@Component({
    selector: 'image-component',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

    @ViewChild('image') imageElement: ElementRef;
    @ViewChild('file') fileElement: ElementRef;
    isUploadingImage = false;
    url: string;
    uploadable: boolean = false;
    removable: boolean = true;
    @Input() choosable: boolean = true;
    @Input() defaultImage: string;
    @Input() image: Image;
    @Input() itemId: string;
    @Input() ref: any;
    ngOnInit(): void {
        if (this.image.id === -1) {
            this.defaultImage = this.image.path + '/' + this.image.name;
            this.imageElement.nativeElement.src = this.defaultImage;
            this.choosable = true;
        } else {
            this.imageElement.nativeElement.src = baseFilePath + this.image.path + '/' + this.image.name;
        }
    }
    constructor(private itemService: ItemService, private notification: NotificationsService) {

    }
    change(e) {
        if (this.fileElement.nativeElement.files.length > 0) {
            this.uploadable = true;
        }
    }
    upload(e) {
        this.isUploadingImage = true;
        e.preventDefault();
        if (this.fileElement.nativeElement.files.length > 0) {
            const result = {
                context: this,
                success(e) {
                    if (e.statusCode === 200) {
                        result.context.imageElement.nativeElement.src = baseFilePath + e.item.path;
                        result.context.image.id = e.item.id;
                        result.context.image.itemId = e.item.itemId;
                        result.context.choosable = false;
                        result.context.notification.success(
                            'Success',
                            'image has been uploaded successfully'
                        );
                        result.context.isUploadingImage = false;
                    }
                }
            };

            this.itemService.uploadImage(new Image({
                itemId: this.itemId
            }), this.fileElement.nativeElement.files[0], result);
        }
    }
    remove(e) {
        this.isUploadingImage = true;
        e.preventDefault();
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    result.context.ref.splice(result.context.ref.indexOf(result.context.image), 1);
                    result.context.notification.success(
                        'Success',
                        'image has been removed successfully',
                        {
                            showProgressBar: true,
                            pauseOnHover: true,
                            clickToClose: true,
                            timeOut: 3000
                        }
                    );
                }
                result.context.isUploadingImage = false;
            }
        };
        this.itemService.removeImage(this.image, result);
    }
}