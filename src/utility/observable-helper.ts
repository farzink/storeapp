import { Observable } from 'rxjs/Observable';
export class ObservableHelper {
    processObservable(source: Observable<any>, success, error, completion) {
        source.subscribe(function (e) {
            success(e);
        }, function (e) {
            if (error != null) { error(e); }
        }, function () {
            if (completion != null) { completion(); }
        });
    }
}
