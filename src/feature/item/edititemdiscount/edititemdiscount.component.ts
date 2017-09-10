import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../../service/item.service';
import { Item } from '../../../model/item.model';


@Component({
    selector: 'edititemdiscount-component',
    templateUrl: './edititemdiscount.component.html',
    styleUrls: ['./edititemdiscount.component.css']
})
export class EditItemDiscountComponent implements OnInit {     
    //@ViewChild('file') fileElement:ElementRef;
    item: Item;
    itemForm: FormGroup;  
    ngOnInit(): void {
        // var id=-1;
        // this.route
        //     .queryParams
        //     .subscribe(p => {
        //         id=+p['id'];                
        //     });
        this.itemForm=this.formBuilder.group({
            title: '',
            name: '',
            price: '',
            manufacturer: '',
            manufacturingType: ''
        });        
        this.getItem(+this.route.snapshot.params['id']);   
    }
    constructor(private itemService:ItemService,private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder)
    {}
    add(e){
        e.preventDefault();        
        var result = {
            context: this,
            success(e) {
                if (e.statusCode == 201)
                {
                console.log(e);
                    result.context.router.navigate(['/home/business/item/edit/1', { queryParams: { id: e.item.id}}]);
                }
            }
        };              
        this.itemService.add(this.itemForm.value, result);
    }
    getItem(id){
        var result = {
            context: this,
            success(e) {
                if (e.statusCode == 200){                 
                    console.log(e);                 
                    result.context.item = e.item;
                }
            }
        };
        //this.itemService.getById(id, result);          
    }
    navigate(){
        this.router.navigateByUrl('/(image)');
    }
}