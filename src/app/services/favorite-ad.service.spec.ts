import { TestBed } from '@angular/core/testing';

import { FavoriteAdService } from './favorite-ad.service';

describe('FavoriteAdService', () => {
  let service: FavoriteAdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteAdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
