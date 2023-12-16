import { TestBed } from '@angular/core/testing';

import { LocalstorageHelperService } from './localstorage-helper.service';

describe('LocalstorageHelperService', () => {
  let service: LocalstorageHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstorageHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
