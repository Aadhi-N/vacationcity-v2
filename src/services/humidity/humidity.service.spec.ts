import { TestBed } from '@angular/core/testing';

import { HumidityService } from './humidity.service';

describe('HumidityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HumidityService = TestBed.get(HumidityService);
    expect(service).toBeTruthy();
  });
});
