import { Injectable } from '@angular/core';
import { ICoreService } from './icore.service';
import { Address } from '../model/address.model';
import { AddressRepository } from '../repository/address.repository';
import { ObservableHelper } from '../utility/observable-helper';
import { ObservableResult } from '../model/observable-result';
@Injectable()
export class AddressService implements ICoreService<Address>{
        add(model: any, result) {
            let load=JSON.stringify(model);
            console.log(load);
            this.observableHelper.processObservable(this.addressRepository.insert(model), 
            result.success, result.error, result.complete);                
        }

    get(result: ObservableResult) {
        throw new Error('Method not implemented.');
    }
    getById(id: number, result: ObservableResult) {
        throw new Error('Method not implemented.');
    }

    constructor(private addressRepository: AddressRepository,
        private observableHelper: ObservableHelper) {
    }
}