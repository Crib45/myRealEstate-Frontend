import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertPicturesComponent } from './advert-pictures.component';

describe('AdvertPicturesComponent', () => {
  let component: AdvertPicturesComponent;
  let fixture: ComponentFixture<AdvertPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertPicturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
