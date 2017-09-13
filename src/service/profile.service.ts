import { Profile } from '../model/profile';
import { ProfileRepository } from '../repository/profile.repository';
import { Injectable } from '@angular/core';
import { ICoreService } from './icore.service';
import { ObservableHelper } from '../utility/observable-helper';
import { ObservableResult } from '../model/observable-result';
@Injectable()
export class ProfileService implements ICoreService<Profile> {
    add(model: any, result) {
        throw new Error('Method not implemented.');
    }

    get(result): any {
        this.observableHelper.processObservable(this.profileRepository.get(), result.success, result.error, result.complete);
    }

    constructor(private profileRepository: ProfileRepository,
        private observableHelper: ObservableHelper) {
    }
    getById(id: number, result): any {
        this.observableHelper.processObservable(this.profileRepository.getEntityById(1), result.success, result.error, result.complete);
    }
    getBusinessAddress(result): any {
        this.observableHelper.processObservable(this.profileRepository.getBusinessAddress(), result.success, result.error, result.complete);
    }
    getBusiness(result): any {
        this.observableHelper.processObservable(this.profileRepository.getBusiness(), result.success, result.error, result.complete);
    }
    addAddress(result): any {

    }
    updateBusinessAddress(model: any, result) {
        let load = JSON.stringify(model);
        this.observableHelper.processObservable(this.profileRepository.updateBusinessAddress(model),
            result.success, result.error, result.complete);
    }
    updateProfile(model: any, result) {
        let load = JSON.stringify(model);
        this.observableHelper.processObservable(this.profileRepository.updateProfile(model),
            result.success, result.error, result.complete);
    }
    updateBusiness(model: any, result) {
        let load = JSON.stringify(model);
        this.observableHelper.processObservable(this.profileRepository.updateBusiness(model),
            result.success, result.error, result.complete);
    }


    activate(model: any, file: File, result) {
        const formData = new FormData();
        formData.append('businessVerificationDocumentName', file);
        formData.append('businessName', model.businessName);
        formData.append('taxIdentification', model.taxIdentification);
        this.observableHelper.processObservable(this.profileRepository.postFormData(formData, "business"),
            result.success, result.error, result.complete);
    }

    getUserData(result): void {
        const token = (JSON.parse(localStorage.getItem('userData')) != null) ? JSON.parse(localStorage.getItem('userData')).token : '';
        if (token === '') {
            this.observableHelper.processObservable(this.profileRepository.get(), function (data) {
                localStorage.setItem('userData', JSON.stringify(data.item));
                if (data.statusCode === 200) {
                    result.success(data.item);
                } else {
                    result.error(data);
                }

            }, function (data) { }, function (data) { });
        } else {
            const userData = (JSON.parse(localStorage.getItem('userData')));
            result.success(userData);
        }
    }

    getWishlist(result) {
        this.observableHelper.processObservable(this.profileRepository.getWishlist(),
            result.success, result.error, result.complete);
    }

    addToWishlist(itemId, result) {
        this.observableHelper.processObservable(this.profileRepository.addToWishlist(itemId),
            result.success, result.error, result.complete);
    }

    removeFromWishlist(itemId, result) {
        this.observableHelper.processObservable(this.profileRepository.removeFromWishlist(itemId),
            result.success, result.error, result.complete);
    }
}

    // activate(model: any, result) {        
    //         let load=JSON.stringify(model);            
    //         this.observableHelper.processObservable(this.profileRepository.post(model, "business"), 
    //         result.success, result.error, result.complete);                
    //     }

