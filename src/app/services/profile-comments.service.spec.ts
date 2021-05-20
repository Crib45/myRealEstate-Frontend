import { TestBed } from '@angular/core/testing';

import { ProfileCommentsService } from './profile-comments.service';

describe('ProfileCommentsService', () => {
  let service: ProfileCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
