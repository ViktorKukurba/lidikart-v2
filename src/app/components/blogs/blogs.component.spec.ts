import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsComponent } from './blogs.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { MockRouter } from '../../mocks/router';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store/reducers';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MockAppDataService } from '../../mocks/app-data.service';
import { AppDataService } from '../../services/app-data.service';

describe('BlogsComponent', () => {
  let component: BlogsComponent;
  let fixture: ComponentFixture<BlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogsComponent ],
      imports: [StoreModule.forRoot(reducers)],
      providers: [
        {provide: AppDataService, useClass: MockAppDataService},
        {provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useValue: {
          params: of(convertToParamMap({post: '1'})),
          snapshot: {params: { post: '1'}}
        }}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
