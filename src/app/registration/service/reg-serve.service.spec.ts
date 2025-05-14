import { TestBed } from '@angular/core/testing';

import { RegServeService } from './reg-serve.service';

describe('RegServeService', () => {
  let service: RegServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
