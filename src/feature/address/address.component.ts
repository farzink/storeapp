import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { Profile } from '../../model/profile';
import { ProfileService } from '../../service/profile.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpHelper } from '../../service/http.helper';
import { ObservableHelper } from '../../utility/observable-helper';
import { Router } from '@angular/router';
import { addressPath } from '../../utility/link';
import { AddressService } from '../../service/address.service';



@Component({
    selector: 'address-component',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
    addressForm: FormGroup;
    ngOnInit(): void {
        this.addressForm=this.formBuilder.group({
            addressLine1: ['', [Validators.required, Validators.minLength(4)]],
            addressLine2: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
            phoneLine: ''
        });     
    }
    constructor(private router: Router, private formBuilder: FormBuilder,
    private addressService: AddressService){        
    }
    add(e){
        e.preventDefault();        
        var result = {
            context: this,
            success(e) {
                if (e.statusCode == 201)
                    result.context.router.navigate(['/home']);
            }
        };              
        this.addressService.add(this.addressForm.value, result);
    }
}