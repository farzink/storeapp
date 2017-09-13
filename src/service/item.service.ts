import { Injectable } from '@angular/core';
import { ICoreService } from './icore.service';
import { ObservableHelper } from '../utility/observable-helper';
import { ObservableResult } from '../model/observable-result';
import { ItemRepository } from '../repository/item.repository';
import { Item } from '../model/item.model';
import { Image } from '../model/image.model';
@Injectable()
export class ItemService implements ICoreService<Item> {
    getItems(result: any) {
        this.observableHelper.processObservable(this.itemRepository.getEntity(null, ''),
            result.success, result.error, result.complete);
    }
    get(result: ObservableResult) {
        throw new Error('Method not implemented.');
    }
    getById(id: number, result: any) {
        this.observableHelper.processObservable(this.itemRepository.getEntityById(id),
            result.success, result.error, result.complete);
    }
    update(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.itemRepository.update(model),
            result.success, result.error, result.complete);
    }
    updateShippingInfo(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.itemRepository.updateShipping(model),
            result.success, result.error, result.complete);
    }
    updateStatus(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.itemRepository.updateItemStatus(model),
            result.success, result.error, result.complete);
    }
    updateSize(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.itemRepository.updateSize(model),
            result.success, result.error, result.complete);
    }
    add(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.itemRepository.insert(model),
            result.success, result.error, result.complete);
    }
    removeImage(model: Image, result) {
        this.observableHelper.processObservable(this.itemRepository.removeEntity(model, model.itemId + '/images/' + model.id),
            result.success, result.error, result.complete);
    }
    getImages(model: number, result) {
        this.observableHelper.processObservable(this.itemRepository.getEntity(model, 'images/' + model),
            result.success, result.error, result.complete);
    }

    searchItems(model: any, result) {
        // this.observableHelper.processObservable(this.itemRepository.SearchByTerm('search/' +
        //     model.term + '?sort=' + model.sort + '&page=' + model.page + '&size=' + model.size),
        this.observableHelper.processObservable(this.itemRepository.searchByTerm
            (`search/${model.term}?sort=${model.sort}&page=${model.page}&size=${model.size}&categoryId=${model.categoryId}`),
            result.success, result.error, result.complete);
    }

    getItemsOfCategory(model: any, result) {
        this.observableHelper.processObservable(this.itemRepository.getItemsOfCategory
            (`search/category/${model.id}?sort=${model.sort}&page=${model.page}&size=${model.size}`),
            result.success, result.error, result.complete);
    }

    getItemDetail(itemId: number, result) {
        this.observableHelper.processObservable(this.itemRepository.getItemDetail(itemId),
            result.success, result.error, result.complete);
    }
    getItemsForAuction(result: any) {
        this.observableHelper.processObservable(this.itemRepository.getEntity(null, 'auctionable'),
            result.success, result.error, result.complete);
    }

    // add(model: any, result) {
    //     throw new Error('Method not implemented.');
    // }

    // get(result): any {
    //     this.observableHelper.processObservable(this.itemRepository.get(), result.success, result.error, result.complete);
    // }

    constructor(private itemRepository: ItemRepository, private observableHelper: ObservableHelper) { }
    uploadImage(model: Image, file: File, result) {
        const formData = new FormData();
        formData.append('images', file);
        formData.append('itemId', model.itemId.toString());
        this.observableHelper.processObservable(this.itemRepository.postFormData(formData, 'images'),
            result.success, result.error, result.complete);
    }
}
