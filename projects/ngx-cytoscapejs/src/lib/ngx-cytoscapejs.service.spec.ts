import { TestBed } from '@angular/core/testing';

import { NgxCytoscapejsService } from './ngx-cytoscapejs.service';

describe('NgxCytoscapejsService', () => {
  let service: NgxCytoscapejsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCytoscapejsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
