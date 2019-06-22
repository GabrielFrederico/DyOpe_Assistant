import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CadastroOperacaoService} from '../service/cadastro-operacao.service';
import {GerenteService} from '../service/gerente.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-andamento-operacoes',
  templateUrl: './andamento-operacoes.component.html',
  preserveWhitespaces: false
})
export class AndamentoOperacoesComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private gerenteService: GerenteService, private modalService: NgbModal,
              private operacaoService: CadastroOperacaoService, private token: TokenStorageService, private router: Router) {
  }

  hoje: Date;
  inicio: Date;
  prazo: Date;
  editarOpe = false;
  escolheu = false;
  operacao: any = {};
  gerente: any;
  etapaproducao: any;
  public erro: boolean;
  public errorMessage = '';
  closeResult: string;
  public info: any;
  peca: any;
  public validado: boolean;
  private cadastrado: boolean;

  resultadoOpe: any;
  isReadonly = true;
  operacaoEscolhida: any;

  newsuboperacao: any = {};
  suboperacaoEscolhida: any;
  ope3 = false;
  valido = true;
  numfumok = false;
  pecarefresh: any;
  operacoesSeparadas = false;

  refreshed = false;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.datareload();
    this.separarOperacoes();
    this.naoAutenticado();

  }

  editar() {
    this.editarOpe = true;
  }

  atualizarSubOpe(subope: any, tempo: any) {
    this.suboperacaoEscolhida = subope;
    this.suboperacaoEscolhida.tempoNesc = tempo;
  }

  update() {
    this.operacaoService.updateOperacao(this.operacaoEscolhida).pipe(first()).subscribe(data => {
      this.resultadoOpe = data;
      this.ope3 = false;
      this.ope3 = true;
      if (this.resultadoOpe.numFuncionariosDisponiveis >= this.resultadoOpe.numFuncionarios) {
        this.numfumok = true;
      }
    }, error => {
      this.erro = true;
      this.errorMessage = error.error;
      console.log(error.error);
    });

  }

  subopeEscolhida(subope: any) {
    this.suboperacaoEscolhida = subope;

  }

  loteOpe(lote: any) {
    this.operacaoEscolhida.loteProducao = lote;
  }

  numfunOpe(numfun: any) {
    this.operacaoEscolhida.numFuncionariosDisponiveis = numfun;
  }

  tempoOpe(tempo: any) {
    this.operacaoEscolhida.tempoTrab = tempo;
  }

  selectsPeca(peca: any) {
    this.peca = peca;

    this.escolheu = true;
  }

  refresh(peca: any) {

    this.peca = peca;
    this.gerenteService.getPecaId(this.peca.id).subscribe(data => {
      this.pecarefresh = data;
      if (this.peca.operacoesFazer.length < this.pecarefresh.operacoesFazer.length
        || this.peca.operacoesAndamento.length < this.pecarefresh.operacoesAndamento.length
        || this.peca.operacoesPrazo.length < this.pecarefresh.operacoesPrazo.length) {
        this.peca = this.pecarefresh;
      }

      this.refreshed = true;
    }, error => {
      console.log(error.error);
    });
    // this.separarOperacoes();
  }

  selectOperacao(operacao: any) {
    this.operacaoEscolhida = operacao;
    this.resultadoOpe = operacao;
    this.ope3 = true;
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

  deletarSubOperacao(subope: any) {
    this.suboperacaoEscolhida = subope;
    const index = this.operacaoEscolhida.suboperacoes.indexOf(this.suboperacaoEscolhida);
    this.operacaoEscolhida.suboperacoes.splice(index, 1);
  }

  cadastrarSubOperacao() {
    this.operacaoEscolhida.suboperacoes.push(this.newsuboperacao);
  }

  datareload() {
    this.gerenteService.getGerente(this.info.username).subscribe(data => this.gerente = data);
    console.clear();
    this.separarOperacoes();
  }

  separarOperacoes() {
    if (!this.operacoesSeparadas) {

      this.hoje = new Date();
      this.peca.operacoesFazer.forEach((data, index) => {
        this.inicio = new Date(data.dataInicio);
        this.prazo = new Date(data.prazo);
        // tslint:disable-next-line:no-shadowed-variable
        const i = this.peca.operacoesFazer.indexOf(data);
        if (this.inicio.getTime() === this.hoje.getTime() || this.inicio < this.hoje) {
          this.peca.operacoesAndamento.push(data);
          this.peca.operacoesFazer.splice(i, 1);
        } else if (this.hoje.getTime() === this.prazo.getTime()) {
          this.peca.operacoesPrazo.push(data);
          this.peca.operacoesFazer.splice(i, 1);
        }

      });
      this.peca.operacoesAndamento.forEach((data, index) => {
        this.inicio = new Date(data.dataInicio);
        this.prazo = new Date(data.prazo);
        // tslint:disable-next-line:no-shadowed-variable
        const i = this.peca.operacoesAndamento.indexOf(data);
        if (this.hoje.getTime() === this.prazo.getTime()) {
          this.peca.operacoesPrazo.push(data);
          this.peca.operacoesAndamento.splice(i, 1);
        }
      });
      this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
      }, error => {
        this.errorMessage = error.error;
        this.erro = true;
      });
      this.operacoesSeparadas = true;
      console.log('opesseparadas');
    }


  }


  trackByFn(operacao) {
    return operacao.id;
  }


  toggleReadonly() {
    this.isReadonly = !this.isReadonly;

  }
}
