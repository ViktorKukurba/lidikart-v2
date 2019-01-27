import { HttpResponse, HttpRequest } from '@angular/common/http';

const MAX_CACHE_AGE = 60000 * 10;

class CacheData {
    response: HttpResponse<any>;
    time: number;
}

export class HttpCache {
    private cacheMap = new Map<string, CacheData>();
    get(req: HttpRequest<any>): HttpResponse<any> | null {
        const entry = this.cacheMap.get(req.urlWithParams);
        if (entry) {
            if ((Date.now() - entry.time) > MAX_CACHE_AGE) {
                this.cacheMap.delete(req.urlWithParams);
                return null;
            }
            return entry.response;
        }
    }

    set(req: HttpRequest<any>, response: HttpResponse<any>) {
        this.cacheMap.set(req.urlWithParams, {response, time: Date.now()});
    }
}
