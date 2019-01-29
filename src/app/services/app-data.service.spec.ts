import { TestBed, inject } from '@angular/core/testing';

import { AppDataService } from './app-data.service';
import { TranslateModule, TranslateService, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';

describe('AppDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot({
        loader: { provide: TranslateLoader, useClass: TranslateFakeLoader}
      })],
      providers: [AppDataService, TranslateService]
    });
  });

  it('should be created', inject([AppDataService], (service: AppDataService) => {
    expect(service).toBeTruthy();
  }));
});
