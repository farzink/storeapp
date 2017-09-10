import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ModalComponent } from './../../../sharedcomponent/modal/modal.component';
import { DialogService } from 'ng2-bootstrap-modal';
import { ItemService } from './../../../service/item.service';
import { Item } from './../../../model/item.model';
import { AuctionService } from './../../../service/auction.service';
import { FormGroup, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuctionCreation } from './../../../model/auctionCreation.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-create-auctions-component',
    templateUrl: './createauctions.component.html',
    styleUrls: ['./createauctions.component.css']
})
export class CreateAuctionsComponent implements OnInit {
    auctionForm: FormGroup;
    itemIsSelected = false;
    selectedItem: Item = null;
    items: Array<Item>;
    filteredItems: Array<Item>;
    isLoading = true;


    constructor(private formBuilder: FormBuilder, private auctionService: AuctionService,
        private itemService: ItemService, private dialogService: DialogService,
        private notification: NotificationsService, private router: Router) { }

    ngOnInit() {

        this.getItems();
    }

    dateValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
            const forbidden = (Date.parse(control.value) === NaN) ? false : true;
            return forbidden ? { 'wrong date': { value: control.value } } : null;
        };
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
            },
            error(e) {
                this.notification.error('Error', 'Could not load your items. please try again later');
            },
            complete(e) {
                result.context.isLoading = false;
            }
        };
        this.itemService.getItemsForAuction(result);
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

    selectItem(itemId) {
        this.selectedItem = this.items.find(i => i.id === itemId);
        console.log(this.selectedItem);
        // this.toSend.itemId = this.selectedItem.id;
        this.itemIsSelected = true;
        this.auctionForm = this.formBuilder.group({
            itemId: '',
            initialPrice: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
            minimumIncrement: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required]],
            endDate: ['', [Validators.required, this.dateValidator]],
            endTime: ['', [Validators.required]]
        });
        this.auctionForm.patchValue({ itemId: this.selectedItem.id });
        console.log(this.auctionForm.value);
    }

    confirmAuction() {
        this.showConfirm();
    }

    createAuction() {
        this.isLoading = true;
        const result = {
            context: this,
            success(e) {
                if (e.statusCode === 201) {
                    result.context.notification.success(
                        'Success',
                        'Auction has been created.',
                    );
                    result.context.isLoading = false;
                    result.context.router.navigate(['/auctions']);
                }
            },
            error(e) {
                console.log(e);
                result.context.notification.alert(
                    'Error',
                    `${e._body}`,
                );
                result.context.isLoading = false;
            }
        };
        this.auctionService.createAuction(JSON.stringify(this.auctionForm.value), result);

    }


    showConfirm() {
        // console.log(this.toSend);
        const disposable = this.dialogService.addDialog(ModalComponent, {
            title: 'Confirm Auction?',
            message: `
            <div class="row">
                <div class="col-xs-12 col-md-6">
                    <div class="row">
                        <div class="col-xs-12">
                            <label>Name</label>:
                            <label>${this.auctionForm.value.title}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <label>Description</label>:
                            ${this.auctionForm.value.description}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <label>Initial Price</label>:
                            <label>${this.auctionForm.value.initialPrice}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <label>Minimum Increament Amount</label>:
                            <label>${this.auctionForm.value.minimumIncrement}</label>
                    </div>
                </div>
                </div>
                <div class="col-xs-12 col-md-6">
                    <div class="row">
                        <div class="col-xs-12">
                            <label>End Date</label>:
                            <label>${this.auctionForm.value.endDate}</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <label>Deletion Policy</label>:
                            <label>${this.itemIsSelected}</label>
                        </div>
                    </div>
                </div>
            </div>
            `
        })
            .subscribe((isConfirmed) => {
                // We get dialog result
                if (isConfirmed) {
                    // this.toSend.endDate.setTime(this.endTime);
                    // console.log(this.endTime);
                    this.createAuction();
                } else {
                    alert('declined');
                }
            });
        // We can close dialog calling disposable.unsubscribe();
        // If dialog was not closed manually close it by timeout
        // setTimeout(() => {
        //     disposable.unsubscribe();
        // }, 10000);
    }
}
