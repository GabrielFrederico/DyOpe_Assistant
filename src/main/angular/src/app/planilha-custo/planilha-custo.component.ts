import {Component, OnInit} from '@angular/core';
import {GerenteService} from '../service/gerente.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {CadastroOperacaoService} from '../service/cadastro-operacao.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-planilha-custo',
  templateUrl: './planilha-custo.component.html'
})
export class PlanilhaCustoComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private gerenteService: GerenteService,
              private etapaService: CadastroOperacaoService, private token: TokenStorageService) {
  }

  public info: any;
  gerente: any;
  etapas: any;
  acessovalido = false;
  invalido = false;
  chaveAcesso: string;
  mensagemErro: string;
  planilha: any = {};
  planilhaEscolhida: any;
  resultadoPlanilha: any;

  validado: boolean;

  atualizarPlanilha = false;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.naoAutenticado();
    this.gerenteService.getGerenteLogado(this.info.username).subscribe(data => {
      this.gerente = data;
    }, error => {
      console.log(error.error);
    });
  }

  cadastrar() {
    if (this.atualizarPlanilha) {
      this.atualizar();
      console.log('planilha ATUALIZADA');
    } else {
      this.planilha.gerente_id = this.gerente.id;
      this.gerente.planilhascusto.push(this.planilha);
      this.gerenteService.cadastrarPlanilha(this.gerente).pipe(first()).subscribe(data => {
        this.getdadosCustos();
      }, error => {
        this.mensagemErro = error.error;
      });
    }
  }

  getdadosCustos() {
    this.gerenteService.getPlanilhaId(this.planilhaEscolhida.id).subscribe(data => {
      this.resultadoPlanilha = data;
    }, error => {
      this.mensagemErro = error.error;
    });
  }

  atualizar() {
    this.gerenteService.atualizarPlanilha(this.planilhaEscolhida).pipe(first()).subscribe(data => {
      this.resultadoPlanilha = data;
    }, error => {
      this.mensagemErro = error.error;
    });
  }

  acessar() {
    this.gerenteService.acessarPlanilha(this.gerente).subscribe(data => {
      this.acessovalido = true;
    }, error => {
      this.invalido = true;
      this.mensagemErro = error.error;
    });
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

  cadastrarPlanilha() {

  }

}
