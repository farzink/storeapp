import { homePath } from './../utility/link';

import { ObservableHelper } from './../utility/observable-helper';
import { Profile } from '../model/profile';
import { Injectable } from '@angular/core';
import { IRepository } from './irepository';
import { HttpHelper } from '../service/http.helper';
import { auctionPath } from '../utility/link';
import { Observable } from 'rxjs/Observable';
import { WebCallResult } from '../utility/webcall-result';
import { Auction } from '../model/auction.model';

@Injectable()
export class AuctionRepository implements IRepository<Auction> {
    getEntityById(id: number): Observable<WebCallResult<Auction>> {
        return this.httpHelper.get(auctionPath + '/' + id)
            .map(e => new WebCallResult<Auction>(new Auction(e.json()),
                e.status,
                e.statusText));
    }
    insert(model: Auction): Observable<WebCallResult<Auction>> {
        return this.httpHelper.post(auctionPath + '/add', model)
            .map(e => new WebCallResult<Auction>(new Auction(e.json()),
                e.status,
                e.statusText));
    }
    update(model: Auction): Observable<WebCallResult<Auction>> {
        return this.httpHelper.put(auctionPath + '/update', model)
            .map(e => new WebCallResult<Auction>(new Auction(e.json()),
                e.status,
                e.statusText));
    }
    remove(model: Auction) {
        throw new Error('Method not implemented.');
    }

    removeEntity(model: any, path: string) {
        return this.httpHelper.delete(auctionPath + '/' + path)
            .map(e => new WebCallResult<any>(e.json(),
                e.status,
                e.statusText));
    }


    getEntity(id: any, path: string): Observable<WebCallResult<any>> {
        return this.httpHelper.get(auctionPath + '/' + path)
            .map(e => new WebCallResult<any>(e.json(),
                e.status,
                e.statusText));
    }

    getAuctionDetail(id: number): Observable<WebCallResult<Auction>> {
        return this.httpHelper.get(homePath + '/auctions/' + id)
            .map(e => new WebCallResult<Auction>(new Auction(e.json()),
                e.status,
                e.statusText));
    }

    getAllAuctions(path: string) {
        return this.httpHelper.get(homePath + '/' + path)
            .map(e => new WebCallResult<Array<Auction>>((e.json()),
                e.status,
                e.statusText));
    }

    createAuction(model: Auction): Observable<WebCallResult<Auction>> {
        return this.httpHelper.post(auctionPath, model)
            .map(e => new WebCallResult<Auction>(new Auction(e.json()),
                e.status,
                e.statusText));
    }

    bid(model: any): Observable<WebCallResult<Auction>> {
        return this.httpHelper.post(auctionPath + '/bid', model)
            .map(e => new WebCallResult<Auction>(new Auction(e.json()),
                e.status,
                e.statusText));
    }

    constructor(private httpHelper: HttpHelper, private observableHelper: ObservableHelper) { }
}
