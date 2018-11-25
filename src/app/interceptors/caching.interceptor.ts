import { Injectable } from '@angular/core';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCache } from './http.cache';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    private cache = new HttpCache();
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        const cache = this.cache.get(req);
        if (cache) {
            console.log('cache', cache);
            return of(cache);
        }
        return this.sendRequest(req, next);
    }

    private sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            tap(event => {
            // There may be other events besides the response.
            if (event instanceof HttpResponse) {
                this.cache.set(req, event); // Update the cache.
            }
        }));
    }
}
