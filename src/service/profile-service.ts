import { Profile } from '../model/profile';
import { ProfileRepository } from '../repository/profile-repository';
import { Injectable } from '@angular/core';
import { ICoreService } from './icore-service';
import { HttpHelper } from './http-helper';
import { ObservableHelper } from '../utility/observable-helper';
@Injectable()
export class ProfileService implements ICoreService<Profile>{
    constructor(private profileRepository: ProfileRepository,
    private observableHelper: ObservableHelper){        
    }
    getById(id: number, result): any {
         this.observableHelper.processObservable(this.profileRepository.getEntityById(1), result.success, result.error, result.complete);                
    }
}