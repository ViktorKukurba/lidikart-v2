import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';

import { BlogComponent } from './blog.component';
import { BlogGuard } from '../../guards/blog.guard';
import { blogsReducer } from '../../store/reducers';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogComponent ],
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('blogFeature', blogsReducer)
      ],
      providers: [
        BlogGuard,
        {provide: ActivatedRoute, useValue: {
          data: of({id: '1'}),
        }}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
