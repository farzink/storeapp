import { Profile } from '../model/profile';
import { ProfileRepository } from '../repository/profile.repository';
import { Injectable } from '@angular/core';
import { ICoreService } from './icore.service';
import { ObservableHelper } from '../utility/observable-helper';
import { ObservableResult } from '../model/observable-result';
@Injectable()
export class ProfileService implements ICoreService<Profile>{
        add(model: any, result) {
            throw new Error('Method not implemented.');
        }

        get(result): any {
            this.observableHelper.processObservable(this.profileRepository.get(), result.success, result.error, result.complete);
        }

    constructor(private profileRepository: ProfileRepository,
    private observableHelper: ObservableHelper){        
    }
    getById(id: number, result): any {
         this.observableHelper.processObservable(this.profileRepository.getEntityById(1), result.success, result.error, result.complete);                
    }
    addAddress(result): any{

    }
}