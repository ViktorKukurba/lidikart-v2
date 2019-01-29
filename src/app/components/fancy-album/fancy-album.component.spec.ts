import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyAlbumComponent } from './fancy-album.component';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { MockRouter } from '../../mocks/router';
import { of } from 'rxjs';
import { ImgLoaderDirective } from '../../directives/img-loader.directive';

describe('FancyAlbumComponent', () => {
  let component: FancyAlbumComponent;
  let fixture: ComponentFixture<FancyAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FancyAlbumComponent, ImgLoaderDirective ],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: ActivatedRoute, useValue: {
          params: of(convertToParamMap({})),
          url: of('')
        }}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyAlbumComponent);
    component = fixture.componentInstance;
    component.items = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
