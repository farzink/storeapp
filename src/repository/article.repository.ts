import { SingleEntityContainer } from './../model/singleEntityContainer';
import { Article } from './../model/article.model';
import { WebCallResult } from './../utility/webcall-result';
import { IRepository } from './irepository';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../service/http.helper';
import { Observable } from 'rxjs/Observable';
import { articlePath } from '../utility/link';
import { DropDown } from '../model/dropdown.model';
@Injectable()
export class ArticleRepository implements IRepository<Article> {
    getEntityById(id: number): Observable<WebCallResult<Article>> {
        return this.httpHelper.get(articlePath + '/' + id)
            .map(e => new WebCallResult<Article>(new Article(e.json()),
                e.status,
                e.statusText));
    }
    insert(model: any): Observable<WebCallResult<Article>> {
        return this.httpHelper.post(articlePath, model)
            .map(e => new WebCallResult<Article>(new Article(e.json()),
                e.status,
                e.statusText));
    }
    update(model: Article): Observable<WebCallResult<Article>> {
        return this.httpHelper.put(articlePath, model)
            .map(e => new WebCallResult<Article>(new Article(e.json()),
                e.status,
                e.statusText));
    }
    remove(model: Article): Observable<WebCallResult<Article>> {
        return this.httpHelper.delete(articlePath + '/' + model.id)
            .map(e => new WebCallResult<Article>(new Article(e.json()),
                e.status,
                e.statusText
            ));
    }

    getMoreArticle(id: number, flag: boolean): Observable<WebCallResult<SingleEntityContainer<Article>>> {
        return this.httpHelper.get(articlePath + '/more/' + id + '?np=' + flag)
            .map(e => new WebCallResult<SingleEntityContainer<Article>>(new SingleEntityContainer<Article>(e.json()),
                e.status,
                e.statusText));
    }

    getAll(path: string) {
        return this.httpHelper.get(articlePath + '/' + path)
            .map(e => new WebCallResult<Array<Article>>((e.json()),
                e.status,
                e.statusText));
    }
    constructor(private httpHelper: HttpHelper) {
    }
}
