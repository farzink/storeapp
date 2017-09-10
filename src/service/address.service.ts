import { Injectable } from '@angular/core';
import { ICoreService } from './icore.service';
import { Address } from '../model/address.model';
import { AddressRepository } from '../repository/address.repository';
import { ObservableHelper } from '../utility/observable-helper';
import { ObservableResult } from '../model/observable-result';
@Injectable()
export class AddressService implements ICoreService<Address>{
    add(model: any, result) {
        let load = JSON.stringify(model);
        this.observableHelper.processObservable(this.addressRepository.insert(model),
            result.success, result.error, result.complete);
    }
    update(model: any, result) {
        let load = JSON.stringify(model);
        console.log(load);
        this.observableHelper.processObservable(this.addressRepository.update(model),
            result.success, result.error, result.complete);
    }
    getAddressTypes(result) {
        this.observableHelper.processObservable(this.addressRepository.getAddressTypes(),
            result.success, result.error, result.complete);
    }
    delete(model: any, result) {
        this.observableHelper.processObservable(this.addressRepository.remove(model),
        result.success, result.error, result.complete);
    }
    getAll(result) {
        this.observableHelper.processObservable(this.addressRepository.getAll(),
            result.success, result.error, result.complete);
    }
    get(result: ObservableResult) {
        throw new Error('Method not implemented.');
    }
    getById(id: number, result) {
        this.observableHelper.processObservable(this.addressRepository.getEntityById(id),
            result.success, result.error, result.complete);
    }

    constructor(private addressRepository: AddressRepository,
        private observableHelper: ObservableHelper) {
    }
}
