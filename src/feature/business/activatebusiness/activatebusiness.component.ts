import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../service/profile.service';
import { NotificationsService } from 'angular2-notifications';


@Component({
    selector: 'activatebusiness-component',
    templateUrl: './activatebusiness.component.html',
    styleUrls: ['./activatebusiness.component.css']
})
export class ActivateBusinessComponent implements OnInit {
    @ViewChild('file') fileElement: ElementRef;
    businessForm: FormGroup;
    isLoading = false;
    ngOnInit(): void {
        this.businessForm = this.formBuilder.group({
            businessName: ['', [Validators.required, Validators.minLength(3)]],
            taxIdentification: ['', [Validators.required, Validators.minLength(6)]],
            businessVerificationDocumentName: ''
        });
    }
    constructor(private profileService: ProfileService, private router: Router,
        private notification: NotificationsService, private formBuilder: FormBuilder) { }
    activate(e) {
        e.preventDefault();
        const result = {
            context: this,
            success(d) {
                if (d.statusCode === 200) {
                    result.context.notification.success(
                        'Success',
                        'Your request has been sent.'
                    );
                    result.context.router.navigate(['/profile']);
                }
            },
            error(d) {
                console.log(d);
            }
        };
        this.profileService.activate(this.businessForm.value, this.fileElement.nativeElement.files[0], result);
    }

    get businessName() { return this.businessForm.get('businessName'); }
    get taxIdentification() { return this.businessForm.get('taxIdentification'); }
    get businessVerificationDocumentName() { return this.businessForm.get('businessVerificationDocumentName'); }
}


// let fileList: FileList = event.target.files;
//     if(fileList.length > 0) {
//         let file: File = fileList[0];
