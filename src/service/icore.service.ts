import { ObservableResult } from '../model/observable-result';
export interface ICoreService<T> {
    get(result: ObservableResult): any;
    getById(id: number, result: ObservableResult): any;
    add(model: any, result: ObservableResult): any;
}
