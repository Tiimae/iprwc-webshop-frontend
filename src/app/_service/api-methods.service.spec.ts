import { TestBed } from '@angular/core/testing';

import { ApiMethodsService } from './api-methods.service';

describe('ApiMethodsService', () => {
  let service: ApiMethodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiMethodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
