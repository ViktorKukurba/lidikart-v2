import { TestBed, async, inject } from '@angular/core/testing';

import { BlogGuard } from './blog.guard';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store/reducers';
import { Router } from '@angular/router';
import { MockRouter } from '../mocks/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WpService } from '../services/wp.service';
import { AppDataService } from '../services/app-data.service';
import { MockAppDataService } from '../mocks/app-data.service';

describe('BlogGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({...reducers}),
        HttpClientTestingModule],
      providers: [
        BlogGuard,
        WpService,
        {provide: AppDataService, useClass: MockAppDataService},
        {provide: Router, useClass: MockRouter}]
    });
  });

  it('should inject', inject([BlogGuard], (guard: BlogGuard) => {
    expect(guard).toBeTruthy();
  }));
});
