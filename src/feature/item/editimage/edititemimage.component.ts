import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../service/item.service';
import { Item } from '../../../model/item.model';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ImageComponent } from '../../image/image.component';
import { Image } from '../../../model/image.model';

@Component({
    selector: 'edititemimage-component',
    templateUrl: './edititemimage.component.html',
    styleUrls: ['./edititemimage.component.css']
})
export class EditItemImageComponent implements OnInit { 
    images: Array<Image>;
    galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];
    item: Item;
    itemForm: FormGroup;
    defaultImage: string = "http://musicatthemonument.com/wp-content/uploads/2014/06/image-placeholder15.jpg";
    itemId: number;
    ngOnInit(): void {
        this.images = new Array<Image>();
        this.itemId = +this.route.snapshot.parent.url[this.route.snapshot.parent.url.length - 1].path;

        // var id=-1;
        // this.route
        //     .queryParams
        //     .subscribe(p => {
        //         id=+p['id'];                
        //     });
        this.itemForm = this.formBuilder.group({
            title: '',
            name: '',
            price: '',
            manufacturer: '',
            manufacturingType: ''
        });
        //this.getItem(+this.route.snapshot.params['id']);
        this.getImages();
    }
    constructor(private itemService: ItemService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder)
    { }
    getImages() {
        var result = {
            context: this,
            success(e) {
                if (e.statusCode === 200) {
                    e.item.map(e => {
                        result.context.images.push(new Image(e));
                    });
                }
            }
        };
        this.itemService.getImages(this.itemId, result);
    }
    getItem(id) {
        var result = {
            context: this,
            success(e) {
                if (e.statusCode == 200) {
                    console.log(e);
                    result.context.item = e.item;
                }
            }
        };
        this.itemService.getById(id, result);
    }
    navigate() {
        this.router.navigateByUrl('/(image)');
    }
    addImage(e) {
        e.preventDefault();
        this.images.push(new Image(null));
    }
}

















// this.galleryOptions = [
//             {
//                 width: '600px',
//                 height: '400px',
//                 thumbnailsColumns: 5,
//                 imageAnimation: NgxGalleryAnimation.Zoom
//             },
//             {
//                 breakpoint: 800,
//                 width: '100%',
//                 height: '600px',
//                 imagePercent: 80,
//                 thumbnailsPercent: 20,
//                 thumbnailsMargin: 20,
//                 thumbnailMargin: 20
//             },
//             {
//                 breakpoint: 400,
//                 preview: true
//             }
//         ];

//         this.galleryImages = [
//             {
//                 small: 'https://www.w3schools.com/css/trolltunga.jpg',
//                 medium: 'https://www.w3schools.com/css/trolltunga.jpg',
//                 big: 'https://www.w3schools.com/css/trolltunga.jpg'
//             },
//             {
//                 small: 'https://cdn.suwalls.com/wallpapers/nature/trolltunga-9064-1920x1200.jpg',
//                 medium: 'https://cdn.suwalls.com/wallpapers/nature/trolltunga-9064-1920x1200.jpg',
//                 big: 'https://cdn.suwalls.com/wallpapers/nature/trolltunga-9064-1920x1200.jpg'
//             },
//             {
//                 small: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Yk3OEzwHVLswb4ipbGIGcTB708R2kA4IWXNnOlET1LSEAPO',
//                 medium: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Yk3OEzwHVLswb4ipbGIGcTB708R2kA4IWXNnOlET1LSEAPO',
//                 big: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Yk3OEzwHVLswb4ipbGIGcTB708R2kA4IWXNnOlET1LSEAPO'
//             },
//             {
//                 small: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Yk3OEzwHVLswb4ipbGIGcTB708R2kA4IWXNnOlET1LSEAPO',
//                 medium: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Yk3OEzwHVLswb4ipbGIGcTB708R2kA4IWXNnOlET1LSEAPO',
//                 big: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Yk3OEzwHVLswb4ipbGIGcTB708R2kA4IWXNnOlET1LSEAPO'
//             },
//             {
//                 small: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Yk3OEzwHVLswb4ipbGIGcTB708R2kA4IWXNnOlET1LSEAPO',
//                 medium: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Yk3OEzwHVLswb4ipbGIGcTB708R2kA4IWXNnOlET1LSEAPO',
//                 big: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF8Yk3OEzwHVLswb4ipbGIGcTB708R2kA4IWXNnOlET1LSEAPO'
//             }
//         ];