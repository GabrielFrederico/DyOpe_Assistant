import {TestBed} from '@angular/core/testing';

import {InfosetorService} from './infosetor.service';

describe('InfosetorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InfosetorService = TestBed.get(InfosetorService);
    expect(service).toBeTruthy();
  });
});
