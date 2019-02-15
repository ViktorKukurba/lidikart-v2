import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { WpService } from './wp.service';
import { AppDataService } from './app-data.service';
import { MockAppDataService } from '../mocks/app-data.service';
import { WpPage } from '../interfaces/wp-page';
import { mapToQueryString } from '../mocks/utils';
import { environment } from '../../environments/environment';

const {SERVICE_URL} = environment;

describe('WpService', () => {

  let service: WpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: AppDataService, useClass: MockAppDataService
      }],
      imports: [HttpClientTestingModule]
    });
    service = TestBed.get(WpService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an Observable<Page[]>', () => {
    const dummyPages: WpPage[] = [
      {slug: 'page1', menu_order: 0, categories: []},
      {slug: 'page2', menu_order: 1, categories: []}
    ];

    service.loadPages().subscribe(pages => {
      expect(pages.length).toBe(2);
      expect(pages).toEqual(dummyPages);
    });
    const http = httpMock.expectOne(`${SERVICE_URL}/pages?` + mapToQueryString(service.params));
    expect(http.request.method).toBe('GET');
    expect(http.request.params.get('per_page')).toBe('100');
    http.flush(dummyPages);
  });
});
