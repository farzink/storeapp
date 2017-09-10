import { Observable } from 'rxjs/Observable';
import { WebCallResult } from '../utility/webcall-result';
export interface IRepository<T> {
    getEntityById(id: number): Observable<WebCallResult<T>>;
    insert(model: T): Observable<WebCallResult<T>>;
    update(model: T): Observable<WebCallResult<T>>;
    remove(model: T);
}