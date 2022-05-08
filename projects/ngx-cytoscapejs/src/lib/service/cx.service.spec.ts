import { TestBed } from '@angular/core/testing';

import { CxService } from './cx.service';

describe('CxService', () => {
  let service: CxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
