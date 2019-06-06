import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

import {EtapaProducao, CadastroOperacaoService} from '../service/cadastro-operacao.service';
import {Observable} from 'rxjs';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CadastroSetorService, Setor} from "../service/cadastro-setor.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Gerente, GerenteService} from "../service/gerente.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  preserveWhitespaces: false
})
export class SidebarComponent implements OnInit {
  public isCollapsed = false;

  @Input() etapas: Observable<EtapaProducao[]>;
  @Input() setores: Observable<Setor[]>;
  public gerenteObj: Observable<Gerente>;
  @Input() gerente: Gerente;


  constructor(private gerenteService: GerenteService, private tipoOpeservice: CadastroOperacaoService, private token: TokenStorageService, private setorservice: CadastroSetorService) {
  }

  public info: any;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.gerenteObj = this.gerenteService.getGerenteLogado(this.info.username);
    this.gerenteObj.subscribe(data => this.gerente = data);
    this.etapas = this.tipoOpeservice.getTiposOperacoes();
    this.setores = this.setorservice.getSetor();
  }


}
