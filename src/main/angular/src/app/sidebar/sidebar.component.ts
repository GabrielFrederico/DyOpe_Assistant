import { Component, OnInit, Input } from '@angular/core';

import { EtapaProducao, CadastroOperacaoService } from '../service/cadastro-operacao.service';
import { Observable } from 'rxjs';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CadastroSetorService, Setor} from "../service/cadastro-setor.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  public isCollapsed = false;

  @Input() etapas: Observable<EtapaProducao[]>;
  @Input() setores: Observable<Setor[]>;

  constructor(private tipoOpeservice: CadastroOperacaoService, private setorservice: CadastroSetorService) {
  }

  ngOnInit() {
    this.etapas = this.tipoOpeservice.getTiposOperacoes();
    this.setores = this.setorservice.getSetor();

  }


}
