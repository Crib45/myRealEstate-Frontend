import { TestBed } from '@angular/core/testing';

import { AdvertCommentsService } from './advert-comments.service';

describe('AdvertCommentsService', () => {
  let service: AdvertCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
