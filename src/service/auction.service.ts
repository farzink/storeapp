import { Injectable } from '@angular/core';
import { ICoreService } from './icore.service';
import { Auction } from '../model/auction.model';
import { AuctionRepository } from '../repository/auction.repository';
import { ObservableHelper } from '../utility/observable-helper';
import { ObservableResult } from '../model/observable-result';
@Injectable()
export class AuctionService implements ICoreService<Auction> {
    add(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.auctionRepository.insert(model),
            result.success, result.error, result.complete);
    }
    update(model: any, result) {
        const load = JSON.stringify(model);
        console.log(load);
        this.observableHelper.processObservable(this.auctionRepository.update(model),
            result.success, result.error, result.complete);
    }
    delete(model: any, result) {
        // this.observableHelper.processObservable(this.auctionRepository.remove(model),
        //     result.success, result.error, result.complete);
    }
    getAll(model, result) {
        this.observableHelper.processObservable(this.auctionRepository.getAllAuctions
            (`?page=${model.page}&sort=${model.sort}&size=${model.size}`),
            result.success, result.error, result.complete);
    }
    get(result: ObservableResult) {
        throw new Error('Method not implemented.');
    }
    getById(id: number, result) {
        this.observableHelper.processObservable(this.auctionRepository.getEntityById(id),
            result.success, result.error, result.complete);
    }

    createAuction(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.auctionRepository.createAuction(model),
            result.success, result.error, result.complete);
    }

    getAuctionDetail(id: number, result) {
        this.observableHelper.processObservable(this.auctionRepository.getAuctionDetail(id),
            result.success, result.error, result.complete);
    }

    bid(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.auctionRepository.bid(model),
            result.success, result.error, result.complete);
    }

    constructor(private auctionRepository: AuctionRepository,
        private observableHelper: ObservableHelper) {
    }
}
