import {TestBed} from '@angular/core/testing';

import {CadastroSetorService} from './cadastro-setor.service';

describe('CadastroSetorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroSetorService = TestBed.get(CadastroSetorService);
    expect(service).toBeTruthy();
  });
});
