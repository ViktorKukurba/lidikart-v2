import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { reducers } from './store/reducers';
import { MockRouter } from './mocks/router';
import { AppDataService } from './services/app-data.service';
import { MockAppDataService } from './mocks/app-data.service';
import { LoadPages } from './store/actions/pages';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoadCategories } from './store/actions/categories';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([]),
        Ng4LoadingSpinnerModule.forRoot(),
        StoreModule.forRoot(reducers),
        NoopAnimationsModule
      ],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: AppDataService, useClass: MockAppDataService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    const router = TestBed.get(Router);
    router.config = {unshift() {}};
    spyOn(router.config, 'unshift');
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should dispatch an the LoadPages and LoadCategories actions in ngOnInit lifecycle', () => {
    const store = TestBed.get(Store);
    store.dispatch = jasmine.createSpy('dispatch');

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(new LoadPages());
    expect(store.dispatch).toHaveBeenCalledWith(new LoadCategories());
  });
});
