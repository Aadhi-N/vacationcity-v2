import { TestBed } from '@angular/core/testing';

import { CityCoordService } from './city-coord.service';

describe('CityCoordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityCoordService = TestBed.get(CityCoordService);
    expect(service).toBeTruthy();
  });
});
