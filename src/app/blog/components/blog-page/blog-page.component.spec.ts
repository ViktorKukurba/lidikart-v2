import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { BlogPageComponent } from './blog-page.component';
import { blogsReducer } from '../../store/reducers';
import { MockAppDataService } from '../../../mocks/app-data.service';
import { AppDataService } from '../../../services/app-data.service';
import { MockRoute } from '../../../mocks/route';

describe('BlogPageComponent', () => {
  let component: BlogPageComponent;
  let fixture: ComponentFixture<BlogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPageComponent ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('blogFeature', blogsReducer),
        NoopAnimationsModule
      ],
      providers: [
        {provide: AppDataService, useClass: MockAppDataService},
        {provide: ActivatedRoute, useClass: MockRoute}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
