import { TestBed } from '@angular/core/testing';

import { StrategyServiceService } from './strategy-service.service';

describe('StrategyServiceService', () => {
  let service: StrategyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrategyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
