import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFiltersComponent } from './favorite-filters.component';

describe('FavoriteFiltersComponent', () => {
  let component: FavoriteFiltersComponent;
  let fixture: ComponentFixture<FavoriteFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
