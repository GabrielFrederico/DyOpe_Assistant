import { Component, OnInit, Input } from '@angular/core';

import { TipoOperacao, CadastroOperacaoService } from '../service/cadastro-operacao.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public isCollapsed = false;

  @Input() tiposOperacao: Observable<TipoOperacao[]>;

  constructor(private tipoOpeservice: CadastroOperacaoService) {
  }

  ngOnInit() {
    this.tiposOperacao = this.tipoOpeservice.getTiposOperacoes();

  }


}
