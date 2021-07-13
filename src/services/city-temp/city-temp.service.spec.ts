import { TestBed } from '@angular/core/testing';

import { CityTempService } from './city-temp.service';

describe('CityTempService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityTempService = TestBed.get(CityTempService);
    expect(service).toBeTruthy();
  });
});
