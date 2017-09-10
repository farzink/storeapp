import { Item } from './../model/item.model';
import { Profile } from '../model/profile';
import { Injectable } from '@angular/core';
import { IRepository } from './irepository';
import { HttpHelper } from '../service/http.helper';
import { profilePath } from '../utility/link';
import { Observable } from 'rxjs';
import { WebCallResult } from '../utility/webcall-result';
import { Business } from '../model/Business.model';
import { Address } from '../model/address.model';
@Injectable()
export class ProfileRepository implements IRepository<Profile> {
    constructor(private httpHelper: HttpHelper) {
    }
    get(): Observable<WebCallResult<Profile>> {
        return this.httpHelper.get(profilePath)
            .map(e => new WebCallResult<Profile>(new Profile(e.json()),
                e.status,
                e.statusText));
    }
    getEntityById(id: number): Observable<WebCallResult<Profile>> {
        return this.httpHelper.get(profilePath)
            .map(e => new WebCallResult<Profile>(new Profile(e.json()),
                e.status,
                e.statusText));
    }
    getBusinessAddress(): Observable<WebCallResult<Address>> {
        return this.httpHelper.get(profilePath + '/business/address')
            .map(e => new WebCallResult<Address>(new Address(e.json()),
                e.status,
                e.statusText));
    }
    getBusiness(): Observable<WebCallResult<Business>> {
        return this.httpHelper.get(profilePath + '/business')
            .map(e => new WebCallResult<Business>(new Business(e.json()),
                e.status,
                e.statusText));
    }
    insert(model: Profile): Observable<WebCallResult<Profile>> {
        throw new Error('Method not implemented.');
    }
    update(model: Profile): Observable<WebCallResult<Profile>> {
        return this.httpHelper.post(profilePath + '/' + model.id, model)
            .map(e => new WebCallResult<Profile>(new Profile(e.json),
                e.status,
                e.statusText));
    }
    updateProfile(model: Profile): Observable<WebCallResult<Profile>> {
        return this.httpHelper.put(profilePath, model)
            .map(e => new WebCallResult<Profile>(new Profile(e.json()),
                e.status,
                e.statusText));
    }
    updateBusinessAddress(model: Profile): Observable<WebCallResult<any>> {
        console.log(profilePath + '/business/address');
        return this.httpHelper.put(profilePath + '/business/address', model)
            .map(e => new WebCallResult<any>(e.json(),
                e.status,
                e.statusText));
    }

    updateBusiness(model: Profile): Observable<WebCallResult<any>> {
        return this.httpHelper.put(profilePath + '/' + 'business', model)
            .map(e => new WebCallResult<any>(e.json(),
                e.status,
                e.statusText));
    }
    remove(model: Profile) {
        throw new Error('Method not implemented.');
    }
    post(model: any, path: string): Observable<WebCallResult<any>> {
        return this.httpHelper.post(profilePath + '/' + path, model)
            .map(e => new WebCallResult<any>(new Profile(e.json()),
                e.status,
                e.statusText));
    }
    postFormData(model: FormData, path: string): Observable<WebCallResult<any>> {
        return this.httpHelper.postFormData(profilePath + '/' + path, model)
            .map(e => new WebCallResult<any>(e.json,
                e.status,
                e.statusText));
    }

    getWishlist(): Observable<WebCallResult<any>> {
        return this.httpHelper.get(profilePath + '/wishlist')
            .map(e => new WebCallResult<Array<Item>>(e.json(),
                e.status,
                e.statusText));
    }

    addToWishlist(itemId): Observable<WebCallResult<Profile>> {
        return this.httpHelper.get(profilePath + '/wishlist/' + itemId)
            .map(e => new WebCallResult<Profile>(new Profile(e.json()),
                e.status,
                e.statusText));
    }

    removeFromWishlist(itemId): Observable<WebCallResult<Profile>> {
        return this.httpHelper.delete(profilePath + '/wishlist/' + itemId)
        .map(e => new WebCallResult<Profile>(new Profile(e.json()),
            e.status,
            e.statusText
        ));
    }
}
