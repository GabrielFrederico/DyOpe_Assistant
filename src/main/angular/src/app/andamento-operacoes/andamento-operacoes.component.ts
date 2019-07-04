import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroOperacaoService } from '../service/cadastro-operacao.service';
import { GerenteService } from '../service/gerente.service';
import { first } from 'rxjs/operators';


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
  descricaosubope: string;
  planilhacusto: any;
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
  operacaoFazer: any;
  inicioAndamento: Date;
  prazoAndamento: Date;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.datareload();
    this.naoAutenticado();

  }

  editar() {
    this.editarOpe = true;
  }

  cancelar() {
    this.editarOpe = false;
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
      this.updatePlanilha();
      this.operacaoService.updateOperacao(this.operacaoEscolhida).pipe(first()).subscribe(ope => {
        this.resultadoOpe = data;
        if (this.resultadoOpe.numFuncionariosDisponiveis >= this.resultadoOpe.numFuncionarios) {
          this.numfumok = true;
        }
        this.editarOpe = false;
      }, error => {
        this.erro = true;
        this.errorMessage = error.error;
        console.log(error.error);
      });
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
    this.descricaosubope = '';
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
    this.refresh(this.peca);
    this.escolheu = false;
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

  excluirOpe() {
    this.operacaoService.deletarOperacao(this.operacaoEscolhida.id).subscribe(data => {
      alert('Operação excluída!');
    }, error => {
      this.errorMessage = error.error;
      this.erro = true;
    });
  }

  deletarOperacao(ope: any) {
    this.operacaoEscolhida = ope;
    this.hoje = new Date();
    this.inicio = new Date(this.operacaoEscolhida.dataInicio);
    this.prazo = new Date(this.operacaoEscolhida.prazo);
    this.inicio.setDate(this.inicio.getDate() + 1);
    this.prazo.setDate(this.prazo.getDate() + 1);
    // tslint:disable-next-line:no-shadowed-variable
    if (this.inicio > this.hoje) {
      const i = this.peca.operacoesFazer.indexOf(this.operacaoEscolhida);
      this.operacaoEscolhida.peca_id = null;
      this.peca.operacoesFazer.splice(i, 1);
      this.updateOpes();
      this.opeSelected = false;
    } else if (this.inicio.getTime() === this.hoje.getTime() || this.inicio < this.hoje && this.prazo > this.hoje) {
      const i = this.peca.operacoesAndamento.indexOf(this.operacaoEscolhida);
      this.operacaoEscolhida.peca_id = null;
      this.peca.operacoesAndamento.splice(i, 1);
      this.updateOpes();
      this.opeSelected = false;
    } else if (this.hoje.getTime() === this.prazo.getTime() || this.prazo < this.hoje) {
      const i = this.peca.operacoesPrazo.indexOf(this.operacaoEscolhida);
      this.operacaoEscolhida.peca_id = null;
      this.peca.operacoesPrazo.splice(i, 1);
      this.updateOpes();
      this.opeSelected = false;
    }

  }

  updatePlanilha() {
    this.gerenteService.atualizarPlanilha(this.planilhacusto).pipe(first()).subscribe(data => {
    }, error => {
      this.errorMessage = error.error;
    });
  }

  cadastrarSubOperacao() {
    this.newsuboperacao.descricao = this.descricaosubope;
    this.operacaoEscolhida.suboperacoes.push(this.newsuboperacao);
  }

  datareload() {
    this.gerenteService.getGerente(this.info.username).subscribe(data => this.gerente = data);
    // console.clear();
  }

  segundosSubOpe(subope: any, segundos: string) {
    this.suboperacaoEscolhida = subope;
    this.suboperacaoEscolhida.segundos = +segundos;
  }

  separarOperacoes() {
    if (!this.operacoesSeparadas) {
      this.hoje = new Date();
      console.log('operacoes Separadas');
      this.peca.operacoesFazer.forEach((data, index) => {
        this.operacaoFazer = data;
        this.inicio = new Date(this.operacaoFazer.dataInicio);
        this.prazo = new Date(this.operacaoFazer.prazo);
        this.inicio.setDate(this.inicio.getDate() + 1);
        this.prazo.setDate(this.prazo.getDate() + 1);
        if (this.inicio.getTime() === this.hoje.getTime() || this.inicio < this.hoje && this.inicio < this.prazo) {
          const i = this.peca.operacoesFazer.indexOf(this.operacaoFazer);
          this.peca.operacoesAndamento.push(this.operacaoFazer);
          this.peca.operacoesFazer.splice(i, 1);
          this.updateOpes();
        } else if (this.hoje.getTime() === this.prazo.getTime() || this.prazo < this.hoje && this.inicio < this.hoje) {
          const i = this.peca.operacoesFazer.indexOf(this.operacaoFazer);
          this.peca.operacoesPrazo.push(this.operacaoFazer);
          this.peca.operacoesFazer.splice(i, 1);
          this.updateOpes();
        }
      });

      // andamento para prazo

      this.peca.operacoesAndamento.forEach((item, index) => {
        this.operacao = item;
        this.inicioAndamento = new Date(this.operacao.dataInicio);
        this.prazoAndamento = new Date(this.operacao.prazo);
        this.inicioAndamento.setDate(this.inicioAndamento.getDate() + 1);
        this.prazoAndamento.setDate(this.prazoAndamento.getDate() + 1);
        if (this.hoje.getTime() === this.prazoAndamento.getTime() || this.prazoAndamento < this.hoje && this.inicioAndamento < this.hoje) {
          const i = this.peca.operacoesAndamento.indexOf(this.operacao);
          this.peca.operacoesAndamento.splice(i, 1);
          this.peca.operacoesPrazo.push(this.operacao);
          this.updateOpes();
        }
      });

      this.operacoesSeparadas = true;

    }
  }

  updateOpes() {
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
    }, error => {
      this.errorMessage = error.error;
      this.erro = true;
    });
  }

  fazerToAndamento() {
    this.gerenteService.addAndamento(this.peca).pipe(first()).subscribe(data => {
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
