import {Component, OnInit} from '@angular/core';
import {CadastroOperacaoService} from '../service/cadastro-operacao.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-gerente',
  templateUrl: './home-gerente.component.html'
})
export class HomeGerenteComponent implements OnInit {
  public info: any;

  public validado: boolean;

  constructor(private tipoOpeservice: CadastroOperacaoService, private token: TokenStorageService, private  router: Router) {
  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.naoAutenticado();
  }

  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_GERENTE') {
      this.validado = false;
      this.router.navigate(['/logingerente']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }
}
