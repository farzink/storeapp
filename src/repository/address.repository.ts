import { WebCallResult } from './../utility/webcall-result';
import { IRepository } from './irepository';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../service/http.helper';
import { Address } from '../model/address.model';
import { Observable } from 'rxjs/Observable';
import { addressPath, addressTypesPath } from '../utility/link';
import { DropDown } from '../model/dropdown.model';
@Injectable()
export class AddressRepository implements IRepository<Address> {
    getEntityById(id: number): Observable<WebCallResult<Address>> {
        return this.httpHelper.get(addressPath + "/" + id)
            .map(e => new WebCallResult<Address>(new Address(e.json()),
                e.status,
                e.statusText));
    }
    insert(model: any): Observable<WebCallResult<Address>> {
        return this.httpHelper.post(addressPath, model)
            .map(e => new WebCallResult<Address>(new Address(e.json()),
                e.status,
                e.statusText));
    }
    update(model: Address): Observable<WebCallResult<Address>> {
        return this.httpHelper.put(addressPath, model)
            .map(e => new WebCallResult<Address>(new Address(e.json()),
                e.status,
                e.statusText));
    }
    remove(model: Address): Observable<WebCallResult<Address>> {
        return this.httpHelper.delete(addressPath + '/' + model.id)
            .map(e => new WebCallResult<Address>(new Address(e.json()),
                e.status,
                e.statusText
            ));
    }
    getAddressTypes() {
        return this.httpHelper.get(addressTypesPath)
            .map(e => new WebCallResult<Array<DropDown>>((e.json()),
                e.status,
                e.statusText));
    }
    getAll() {
        return this.httpHelper.get(addressPath)
            .map(e => new WebCallResult<Array<Address>>((e.json()),
                e.status,
                e.statusText));
    }
    constructor(private httpHelper: HttpHelper) {
    }
}
