import { ItemRating } from './../model/itemRating.model';
import { homePath, itemPath } from './../utility/link';
import { Profile } from '../model/profile';
import { Injectable } from '@angular/core';
import { IRepository } from './irepository';
import { HttpHelper } from '../service/http.helper';
import { Observable } from 'rxjs/Observable';
import { WebCallResult } from '../utility/webcall-result';
import { Item } from '../model/item.model';
import { Image } from '../model/image.model';
@Injectable()
export class ItemRepository implements IRepository<Item> {
    getEntityById(id: number): Observable<WebCallResult<Item>> {
        return this.httpHelper.get(itemPath + '/' + id)
            .map(e => new WebCallResult<Item>(new Item(e.json()),
                e.status,
                e.statusText));
    }
    insert(model: Item): Observable<WebCallResult<Item>> {
        return this.httpHelper.post(itemPath + '/add', model)
            .map(e => new WebCallResult<Item>(new Item(e.json()),
                e.status,
                e.statusText));
    }
    update(model: Item): Observable<WebCallResult<Item>> {
        return this.httpHelper.put(itemPath + '/update', model)
            .map(e => new WebCallResult<Item>(new Item(e.json()),
                e.status,
                e.statusText));
    }

    updateShipping(model: Item): Observable<WebCallResult<Item>> {
        return this.httpHelper.put(itemPath + '/shippinginfo', model)
            .map(e => new WebCallResult<Item>(new Item(e.json()),
                e.status,
                e.statusText));
    }

    updateItemStatus(model: Item): Observable<WebCallResult<Item>> {
        return this.httpHelper.put(itemPath + '/status', model)
            .map(e => new WebCallResult<Item>(new Item(e.json()),
                e.status,
                e.statusText));
    }
    updateSize(model: Item): Observable<WebCallResult<Item>> {
        return this.httpHelper.put(itemPath + '/update/size', model)
            .map(e => new WebCallResult<Item>(new Item(e.json()),
                e.status,
                e.statusText));
    }

    remove(model: Item) {
        throw new Error("Method not implemented.");
    }
    removeEntity(model: any, path: string) {
        return this.httpHelper.delete(itemPath + '/' + path)
            .map(e => new WebCallResult<any>(e.json(),
                e.status,
                e.statusText));
    }


    getEntity(id: any, path: string): Observable<WebCallResult<any>> {
        return this.httpHelper.get(itemPath + '/' + path)
            .map(e => new WebCallResult<any>(e.json(),
                e.status,
                e.statusText));
    }

    getItemDetail(id: number): Observable<WebCallResult<Item>> {
        return this.httpHelper.get(homePath + '/detail/' + id)
            .map(e => new WebCallResult<Item>(new Item(e.json()),
                e.status,
                e.statusText));
    }

    searchByTerm(path: string) {
        return this.httpHelper.get(homePath + '/' + path)
            .map(e => new WebCallResult<Array<Item>>((e.json()),
                e.status,
                e.statusText));
    }

    getItemsOfCategory(path: string) {
        return this.httpHelper.get(homePath + '/' + path)
            .map(e => new WebCallResult<Array<Item>>((e.json()),
                e.status,
                e.statusText));
    }

    getItemRating(itemId: number): Observable<WebCallResult<ItemRating>> {
        return this.httpHelper.get(`${homePath}/rates/${itemId}`)
            .map(e => new WebCallResult<ItemRating>(new ItemRating(e.json()),
                e.status,
                e.statusText));
    }

    constructor(private httpHelper: HttpHelper) { }

    postFormData(model: FormData, path: string): Observable<WebCallResult<Image>> {
        return this.httpHelper.postFormData(itemPath + '/' + path, model)
            .map(e => new WebCallResult<Image>(new Image(e.json()),
                e.status,
                e.statusText));
    }
}
