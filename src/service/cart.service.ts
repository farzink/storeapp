import { ObservableResult } from './../model/observable-result';
import { OrderRepository } from './../repository/order.repository';
import { ObservableHelper } from './../utility/observable-helper';
import { Order } from './../model/order.model';
import { ICoreService } from './icore.service';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { Item } from './../model/item.model';
import { Injectable } from '@angular/core';
@Injectable()
export class CartService implements ICoreService<Order> {
    private cart = new Subject();

    constructor(private orderRepository: OrderRepository, private observableHelper: ObservableHelper) {

    }

    update() {
        const result = {
            context: this,
            success(e) {
                result.context.updateCart(e.item);
            }
        };
        this.getCurrentCart(result);
    }

    updateCart(e) {
        this.cart.next(e);
    }

    getCurrentCart(result) {
        const res = this.observableHelper.processObservable(this.orderRepository.getCurrentCart(),
            result.success, result.error, result.complete);
    }

    getObservableCart() {
        return this.cart;
    }

    addToObservableCart(item: Item) {
        this.cart.next(item);
    }

    addToCart(item, result) {
        const res = this.observableHelper.processObservable(this.orderRepository.addToCart(item),
            result.success, result.error, result.complete);
    }

    removeFromCart(item: any, result) {
        const res = this.observableHelper.processObservable(this.orderRepository.removeFromCart(item),
            result.success, result.error, result.complete);
    }

    updateOrderWithAddress(model: any, result) {
        const res = this.observableHelper.processObservable(this.orderRepository.updateCheckoutAddress('checkout/address', model),
            result.success, result.error, result.complete);
    }

    emptyCart() {
        // this.cart = [];
    }

    get(result: ObservableResult) {
        throw new Error('Method not implemented.');
    }
    getById(id: number, result: any) {
        throw new Error('Method not implemented.');
    }
    add(model: any, result) {
        throw new Error('Method not implemented.');
    }
}
