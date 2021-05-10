import { TestBed } from '@angular/core/testing';

import { AdvertisementPictureService } from './advertisement-picture.service';

describe('AdvertisementPictureService', () => {
  let service: AdvertisementPictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertisementPictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
