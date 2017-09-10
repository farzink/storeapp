import { SingleEntityContainer } from './../model/singleEntityContainer';
import { Story } from './../model/story.model';
import { WebCallResult } from './../utility/webcall-result';
import { IRepository } from './irepository';
import { Injectable } from '@angular/core';
import { HttpHelper } from '../service/http.helper';
import { Observable } from 'rxjs/Observable';
import { storyPath } from '../utility/link';
import { DropDown } from '../model/dropdown.model';
@Injectable()
export class StoryRepository implements IRepository<Story> {
    getEntityById(id: number): Observable<WebCallResult<Story>> {
        return this.httpHelper.get(storyPath + '/' + id)
            .map(e => new WebCallResult<Story>(new Story(e.json()),
                e.status,
                e.statusText));
    }
    insert(model: any): Observable<WebCallResult<Story>> {
        return this.httpHelper.post(storyPath, model)
            .map(e => new WebCallResult<Story>(new Story(e.json()),
                e.status,
                e.statusText));
    }
    update(model: Story): Observable<WebCallResult<Story>> {
        return this.httpHelper.put(storyPath, model)
            .map(e => new WebCallResult<Story>(new Story(e.json()),
                e.status,
                e.statusText));
    }
    remove(model: Story): Observable<WebCallResult<Story>> {
        return this.httpHelper.delete(storyPath + '/' + model.id)
            .map(e => new WebCallResult<Story>(new Story(e.json()),
                e.status,
                e.statusText
            ));
    }

    getMoreStory(id: number, flag: boolean): Observable<WebCallResult<SingleEntityContainer<Story>>> {
        return this.httpHelper.get(storyPath + '/more/' + id + '?np=' + flag)
            .map(e => new WebCallResult<SingleEntityContainer<Story>>(new SingleEntityContainer<Story>(e.json()),
                e.status,
                e.statusText));
    }

    getAll(path: string) {
        return this.httpHelper.get(storyPath + '/' + path)
            .map(e => new WebCallResult<Array<Story>>((e.json()),
                e.status,
                e.statusText));
    }
    constructor(private httpHelper: HttpHelper) {
    }
}
