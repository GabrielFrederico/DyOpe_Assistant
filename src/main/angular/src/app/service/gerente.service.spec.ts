import {TestBed} from '@angular/core/testing';

import {GerenteService} from './gerente.service';

describe('GerenteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GerenteService = TestBed.get(GerenteService);
    expect(service).toBeTruthy();
  });
});
