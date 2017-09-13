import { ArticleRepository } from './../repository/article.repository';
import { Article } from './../model/article.model';
import { Injectable } from '@angular/core';
import { ICoreService } from './icore.service';
import { AddressRepository } from '../repository/address.repository';
import { ObservableHelper } from '../utility/observable-helper';
import { ObservableResult } from '../model/observable-result';
@Injectable()
export class ArticleService implements ICoreService<Article> {
    add(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.articleRepository.insert(model),
            result.success, result.error, result.complete);
    }
    update(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.articleRepository.update(model),
            result.success, result.error, result.complete);
    }
    delete(model: any, result) {
        this.observableHelper.processObservable(this.articleRepository.remove(model),
            result.success, result.error, result.complete);
    }
    getAll(model: any, result) {
        this.observableHelper.processObservable(this.articleRepository.getAll('?start=' + model.start + '&size=' + model.size),
            result.success, result.error, result.complete);
    }
    get(result: ObservableResult) {
        throw new Error('Method not implemented.');
    }
    getById(id: number, result) {
        this.observableHelper.processObservable(this.articleRepository.getEntityById(id),
            result.success, result.error, result.complete);
    }

    checkForMoreArticles(model: any, result) {
        this.observableHelper.processObservable(this.articleRepository.getMoreArticle(model.id, model.flag),
            result.success, result.error, result.complete);
    }


    constructor(private articleRepository: ArticleRepository,
        private observableHelper: ObservableHelper) {
    }
}
