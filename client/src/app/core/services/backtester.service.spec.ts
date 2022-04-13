import { TestBed } from '@angular/core/testing';

import { BacktesterService } from './backtester.service';

describe('BacktesterService', () => {
  let service: BacktesterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BacktesterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
