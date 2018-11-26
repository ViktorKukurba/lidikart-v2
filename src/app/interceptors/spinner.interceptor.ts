import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

    private count = 0;

    constructor(private spinner: Ng4LoadingSpinnerService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.count++;
        if (this.count > 0) {
            this.spinner.show();
        }

        const handleObs: Observable<HttpEvent<any>> = next.handle(req);

        handleObs.pipe(catchError((err: any) => {
            this.count--;
            return Observable.throw(err);
        }), tap(event => {
            if (event instanceof HttpResponse) {
                this.count--;
                if (this.count === 0) {
                    this.spinner.hide();
                }
            }
        }));

        return handleObs;
    }
}
