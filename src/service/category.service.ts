import { CategoryRepository } from './../repository/category.repository';
import { ItemCategory } from './../model/itemCategory.model';
import { BusinessCategory } from './../model/businessCategory.mode';
import { ArticleRepository } from './../repository/article.repository';
import { Article } from './../model/article.model';
import { Injectable } from '@angular/core';
import { ICoreService } from './icore.service';
import { AddressRepository } from '../repository/address.repository';
import { ObservableHelper } from '../utility/observable-helper';
import { ObservableResult } from '../model/observable-result';
@Injectable()
export class CategoryService {
    private businessCategory: Array<BusinessCategory> = [];
    private itemCategory: Array<ItemCategory> = [];


    getAllBusinessCategories(interested) {
        if (this.businessCategory.length > 0) {
            console.log('upper');
            interested.satisfy(this.businessCategory);
        } else {
            const result = {
                context: this,
                success(e) {
                    interested.satisfy(e.item);
                    result.context.businessCategory = e.item;
                    // console.log(result.context.businessCategory);

                }
            };
            this.updateBusinessCategoryArray(result);
            // return result.context.businessCategory;
        }
    }

    updateBusinessCategoryArray(result) {
        this.observableHelper.processObservable(this.categoryRepository.getAllBusinessCategory('businesscategories'),
            result.success, result.error, result.complete);
    }

    getAllItemCategories(interested) {
        if (this.itemCategory.length > 0) {
            interested.satisfy(this.itemCategory);
        } else {
            const result = {
                context: this,
                success(e) {
                    interested.satisfy(e.item);
                    result.context.itemCategory = e.item;
                    // console.log(result.context.businessCategory);

                }
            };
            this.updateItemCategoryArray(result);
            // return result.context.businessCategory;
        }
    }

    updateItemCategoryArray(result) {
        this.observableHelper.processObservable(this.categoryRepository.getAllItemCategory('categories'),
            result.success, result.error, result.complete);
    }

    constructor(private categoryRepository: CategoryRepository,
        private observableHelper: ObservableHelper) {
    }
}
