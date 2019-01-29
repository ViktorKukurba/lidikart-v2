import { TestBed, async } from '@angular/core/testing';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';
import { Router } from '@angular/router';
import { MockRouter } from './mocks/router';
import { AppDataService } from './services/app-data.service';
import { MockAppDataService } from './mocks/app-data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [ RouterTestingModule, Ng4LoadingSpinnerModule.forRoot(), StoreModule.forRoot(reducers) ],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: AppDataService, useClass: MockAppDataService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
