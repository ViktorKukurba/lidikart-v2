import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhibitionsComponent } from './exhibitions.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../../store/reducers';
import { RouterTestingModule } from '@angular/router/testing';
import { ImgLoaderDirective } from '../../directives/img-loader.directive';

describe('ExhibitionsComponent', () => {
  let component: ExhibitionsComponent;
  let fixture: ComponentFixture<ExhibitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({...reducers}),
        RouterTestingModule
      ],
      declarations: [ ExhibitionsComponent, ImgLoaderDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhibitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
