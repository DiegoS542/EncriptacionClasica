import { TestBed } from '@angular/core/testing';

import { CrackService } from './crack.service';

describe('CrackService', () => {
  let service: CrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
