import {Component, OnInit} from '@angular/core';

import {CadastroOperacaoService} from '../service/cadastro-operacao.service';
import {CadastroSetorService} from '../service/cadastro-setor.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {GerenteService} from '../service/gerente.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  preserveWhitespaces: false
})
export class SidebarComponent implements OnInit {
  public isCollapsed = false;
  etapas: any;
  gerente: any;


  // tslint:disable-next-line:max-line-length
  constructor(private gerenteService: GerenteService, private tipoOpeservice: CadastroOperacaoService, private token: TokenStorageService, private setorservice: CadastroSetorService) {
  }

  public info: any;

  informacoes() {

    this.gerenteService.getGerenteLogado(this.info.username).subscribe(data => {
      if (this.gerente.setores.length < data.setores.length) {
        this.gerente = data;
      }
    }, error => {
      console.log(error.error);
    });
  }


  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.gerenteService.getGerenteLogado(this.info.username).subscribe(data => this.gerente = data);
    this.tipoOpeservice.getTiposOperacoes().subscribe(data => {
      this.etapas = data;
    });
    console.clear();
  }


}
