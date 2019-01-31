import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerComponent } from './banner.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store/reducers';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerComponent ],
      imports: [ StoreModule.forRoot(reducers) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('shoold show', (done) => {
    component.show$.subscribe(show => {
      console.log('SHOW', show);
      expect(show).toBe(true);
      done();
    });
  });
});
