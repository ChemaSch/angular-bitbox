import { TestBed } from '@angular/core/testing';

import { PriceReductionService } from './price-reduction.service';

describe('PriceReductionService', () => {
  let service: PriceReductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceReductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
