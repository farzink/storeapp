import { ItemCategory } from './../model/itemCategory.model';
import { BusinessCategory } from './../model/businessCategory.mode';
import { homePath } from './../utility/link';
import { WebCallResult } from './../utility/webcall-result';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../service/http.helper';

@Injectable()
export class CategoryRepository {
    getAllBusinessCategory(path: string) {
        return this.httpHelper.get(homePath + '/' + path)
            .map(e => new WebCallResult<Array<BusinessCategory>>((e.json()),
                e.status,
                e.statusText));
    }

    getAllItemCategory(path: string) {
        return this.httpHelper.get(homePath + '/' + path)
            .map(e => new WebCallResult<Array<ItemCategory>>((e.json()),
                e.status,
                e.statusText));
    }
    constructor(private httpHelper: HttpHelper) {
    }
}
