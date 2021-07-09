import { TestBed } from '@angular/core/testing';

import { GlobalxService } from './globalx.service';

describe('GlobalxService', () => {
  let service: GlobalxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
