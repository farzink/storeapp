import { IRepository } from './irepository';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../service/http.helper';
import { Address } from '../model/address.model';
import { Observable } from 'rxjs';
import { WebCallResult } from '../utility/webcall-result';
import { addressPath } from '../utility/link';
@Injectable()
export class AddressRepository implements IRepository<Address>{
        getEntityById(id: number): Observable<WebCallResult<Address>> {
            throw new Error('Method not implemented.');
        }
    insert(model: any): Observable<WebCallResult<Address>> {
        return this.httpHelper.post(addressPath, model)            
            .map(e=>  new WebCallResult<Address>(new Address(e.json()),
            e.status,
            e.statusText));
    }
    update(model: Address): Observable<WebCallResult<Address>> {
        throw new Error('Method not implemented.');
    }
    remove(model: Address) {
        throw new Error('Method not implemented.');
    }

    constructor(private httpHelper: HttpHelper){
    }
}