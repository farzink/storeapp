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
export class OrderSericve implements ICoreService<Order> {
    private cart = new Subject();

    constructor(private orderRepository: OrderRepository, private observableHelper: ObservableHelper) {

    }

    getCheckoutReview(result) {
        this.observableHelper.processObservable(this.orderRepository.getCheckoutReview(),
            result.success, result.error, result.complete);
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
