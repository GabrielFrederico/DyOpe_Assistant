import {TestBed} from '@angular/core/testing';

import {CadastroOperacaoService} from './cadastro-operacao.service';

describe('CadastroOperacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadastroOperacaoService = TestBed.get(CadastroOperacaoService);
    expect(service).toBeTruthy();
  });
});
