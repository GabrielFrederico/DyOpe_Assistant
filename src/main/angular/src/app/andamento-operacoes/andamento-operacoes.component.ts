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
  operacao: any;
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
  opeSelected = false;
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
      this.editarOpe = false;
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
    this.refresh(this.peca);
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
      this.separarOperacoes();
      this.refreshed = true;
    }, error => {
      console.log(error.error);
    });

  }

  selectOperacao(operacao: any) {
    this.operacaoEscolhida = operacao;
    this.resultadoOpe = operacao;
    this.ope3 = true;
    this.opeSelected = true;
    this.escolheu = false;
  }

  voltar() {
    this.opeSelected = false;
    this.escolheu = true;
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

  deletarOperacao(ope: any) {
    this.operacaoEscolhida = ope;
    this.hoje = new Date();
    this.inicio = new Date(this.operacaoEscolhida.dataInicio);
    this.prazo = new Date(this.operacaoEscolhida.prazo);
    // tslint:disable-next-line:no-shadowed-variable
    if (this.inicio > this.hoje) {
      const i = this.peca.operacoesFazer.indexOf(this.operacaoEscolhida);
      this.peca.operacoesFazer.splice(i, 1);
      this.updateOpes();
      alert('Operação excluída!');
      this.opeSelected = false;
    } else if (this.inicio.getTime() === this.hoje.getTime() || this.inicio < this.hoje) {
      const i = this.peca.operacoesAndamento.indexOf(this.operacaoEscolhida);
      this.peca.operacoesAndamento.splice(i, 1);
      this.updateOpes();
      alert('Operação excluída!');
      this.opeSelected = false;
    } else if (this.hoje.getTime() === this.prazo.getTime() || this.prazo < this.hoje) {
      const i = this.peca.operacoesPrazo.indexOf(this.operacaoEscolhida);
      this.peca.operacoesPrazo.splice(i, 1);
      this.updateOpes();
      alert('Operação excluída!');

      this.opeSelected = false;
    }

  }

  cadastrarSubOperacao() {
    this.operacaoEscolhida.suboperacoes.push(this.newsuboperacao);
  }

  datareload() {
    this.gerenteService.getGerente(this.info.username).subscribe(data => this.gerente = data);
    console.clear();
  }

  separarOperacoes() {

      this.hoje = new Date();
      this.peca.operacoesFazer.forEach((data, index) => {
        this.operacao = data;
        this.inicio = new Date(this.operacao.dataInicio);
        this.prazo = new Date(this.operacao.prazo);
        // tslint:disable-next-line:no-shadowed-variable
        const i = this.peca.operacoesFazer.indexOf(this.operacao);
        if (this.inicio.getTime() === this.hoje.getTime() || this.inicio < this.hoje) {
          this.peca.operacoesAndamento.push(this.operacao);
          this.peca.operacoesFazer.splice(i, 1);
          this.updateOpes();
        } else if (this.hoje.getTime() === this.prazo.getTime() || this.prazo < this.hoje) {
          this.peca.operacoesPrazo.push(this.operacao);
          this.peca.operacoesFazer.splice(i, 1);
          this.updateOpes();
        }

      });
      this.peca.operacoesAndamento.forEach((data, index) => {
        this.operacao = data;
        this.inicio = new Date(this.operacao.dataInicio);
        this.prazo = new Date(this.operacao.prazo);
        // tslint:disable-next-line:no-shadowed-variable
        const i = this.peca.operacoesAndamento.indexOf(this.operacao);
        if (this.hoje.getTime() === this.prazo.getTime()  || this.prazo < this.hoje) {
          this.peca.operacoesPrazo.push(this.operacao);
          this.peca.operacoesAndamento.splice(i, 1);
          this.updateOpes();
        }
      });
      this.operacoesSeparadas = true;
      console.log('opesseparadas');

  }

  updateOpes() {
    this.gerenteService.atualizarPeca(this.peca).pipe(first()).subscribe(data => {
    }, error => {
      this.errorMessage = error.error;
      this.erro = true;
    });
  }
  updateOpesFazer() {
    this.gerenteService.pecaOpesFazer(this.peca).pipe(first()).subscribe(data => {
    }, error => {
      this.errorMessage = error.error;
      this.erro = true;
    });
  }


  trackByFn(operacao) {
    return operacao.id;
  }


  toggleReadonly() {
    this.isReadonly = !this.isReadonly;

  }
}
