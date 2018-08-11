import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyAlbumComponent } from './fancy-album.component';

describe('FancyAlbumComponent', () => {
  let component: FancyAlbumComponent;
  let fixture: ComponentFixture<FancyAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FancyAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
