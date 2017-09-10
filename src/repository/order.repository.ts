import { Order } from './../model/order.model';
import { SingleEntityContainer } from './../model/singleEntityContainer';
import { WebCallResult } from './../utility/webcall-result';
import { IRepository } from './irepository';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../service/http.helper';
import { Observable } from 'rxjs/Observable';
import { orderPath } from '../utility/link';
import { DropDown } from '../model/dropdown.model';
@Injectable()
export class OrderRepository implements IRepository<Order> {
    getEntityById(id: number): Observable<WebCallResult<Order>> {
        return this.httpHelper.get(orderPath + '/' + id)
            .map(e => new WebCallResult<Order>(new Order(e.json()),
                e.status,
                e.statusText));
    }
    insert(model: any): Observable<WebCallResult<Order>> {
        return this.httpHelper.post(orderPath, model)
            .map(e => new WebCallResult<Order>(new Order(e.json()),
                e.status,
                e.statusText));
    }
    update(model: Order): Observable<WebCallResult<Order>> {
        return this.httpHelper.put(orderPath, model)
            .map(e => new WebCallResult<Order>(new Order(e.json()),
                e.status,
                e.statusText));
    }
    remove(model: Order): Observable<WebCallResult<Order>> {
        return this.httpHelper.delete(orderPath + '/' + model.id)
            .map(e => new WebCallResult<Order>(new Order(e.json()),
                e.status,
                e.statusText
            ));
    }

    addToCart(model: any): Observable<WebCallResult<Order>> {
        return this.httpHelper.post(orderPath + '/addToCart', model)
            .map(e => new WebCallResult<Order>(new Order(e.json()),
                e.status,
                e.statusText));
    }

    removeFromCart(model: any): Observable<WebCallResult<Order>> {
        return this.httpHelper.delete(orderPath + '/removeFromCart/' + model.id)
            .map(e => new WebCallResult<Order>(new Order(e.json()),
                e.status,
                e.statusText));
    }

    getCurrentCart() {
        return this.httpHelper.get(orderPath + '/cart')
            .map(e => new WebCallResult<Array<Order>>((e.json()),
                e.status,
                e.statusText));
    }

    updateCheckoutAddress(path: string, model: any) {
        return this.httpHelper.put(`${orderPath}/${path}`, model)
            .map(e => new WebCallResult<Order>(new Order(e.json()),
                e.status,
                e.statusText));
    }

    constructor(private httpHelper: HttpHelper) {
    }
}
