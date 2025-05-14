import { TestBed } from '@angular/core/testing';

import { DetailsServeService } from './details-serve.service';

describe('DetailsServeService', () => {
  let service: DetailsServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
