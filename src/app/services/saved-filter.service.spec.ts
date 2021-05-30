import { TestBed } from '@angular/core/testing';

import { SavedFilterService } from './saved-filter.service';

describe('SavedFilterService', () => {
  let service: SavedFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavedFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
