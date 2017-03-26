import { Profile } from '../model/profile';
import { Injectable } from '@angular/core';
import { IRepository } from './irepository';
import { HttpHelper } from '../service/http-helper';
import { profilePath } from '../utility/link';
import { Observable } from 'rxjs';
import { WebCallResult } from '../utility/webcall-result';
@Injectable()
export class ProfileRepository implements IRepository<Profile>{
    constructor(private httpHelper: HttpHelper){        
    }
    getEntityById(id: number): Observable<WebCallResult<Profile>> {        
        return this.httpHelper.get(profilePath + "/" + id)            
            .map(e=>  new WebCallResult<Profile>(new Profile(e.json()),
            e.status,
            e.statusText));
    }
    insert(model: Profile): Observable<WebCallResult<Profile>> {
        throw new Error('Method not implemented.');
    }
    update(model: Profile): Observable<WebCallResult<Profile>> {
        return this.httpHelper.post(profilePath + "/" + model.id, model)
            .map(e=>  new WebCallResult<Profile>(new Profile(e.json),
            e.status,
            e.statusText));        
    }
    remove(model: Profile) {
        throw new Error('Method not implemented.');
    }
}