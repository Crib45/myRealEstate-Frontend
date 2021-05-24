import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilEditComponent } from './util-edit.component';

describe('UtilEditComponent', () => {
  let component: UtilEditComponent;
  let fixture: ComponentFixture<UtilEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
