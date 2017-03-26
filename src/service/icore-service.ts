import { ObservableResult } from '../model/observable-result';
export interface ICoreService<T>{
    getById(id: number, result: ObservableResult): any;
}