import { TestBed } from '@angular/core/testing';

import { BorsdataService } from './borsdata.service';

describe('BorsdataService', () => {
  let service: BorsdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorsdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
