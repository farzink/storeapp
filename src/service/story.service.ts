import { StoryRepository } from './../repository/story.repository';
import { Story } from './../model/story.model';
import { Injectable } from '@angular/core';
import { ICoreService } from './icore.service';
import { AddressRepository } from '../repository/address.repository';
import { ObservableHelper } from '../utility/observable-helper';
import { ObservableResult } from '../model/observable-result';
@Injectable()
export class StoryService implements ICoreService<Story> {
    add(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.storyRepository.insert(model),
            result.success, result.error, result.complete);
    }
    update(model: any, result) {
        const load = JSON.stringify(model);
        this.observableHelper.processObservable(this.storyRepository.update(model),
            result.success, result.error, result.complete);
    }
    delete(model: any, result) {
        this.observableHelper.processObservable(this.storyRepository.remove(model),
            result.success, result.error, result.complete);
    }
    getAll(model: any, result) {
        this.observableHelper.processObservable(this.storyRepository.getAll('?start=' + model.start + '&size=' + model.size),
            result.success, result.error, result.complete);
    }
    get(result: ObservableResult) {
        throw new Error('Method not implemented.');
    }
    getById(id: number, result) {
        this.observableHelper.processObservable(this.storyRepository.getEntityById(id),
            result.success, result.error, result.complete);
    }

    checkForMoreStories(model: any, result) {
        this.observableHelper.processObservable(this.storyRepository.getMoreStory(model.id, model.flag),
            result.success, result.error, result.complete);
    }

    constructor(private storyRepository: StoryRepository,
        private observableHelper: ObservableHelper) {
    }
}
