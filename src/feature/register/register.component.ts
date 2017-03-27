import { Component, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";



@Component({
    selector: 'register-component',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {    
    rememberMe: Boolean;
    constructor(){
    }
}