import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../auth/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroOperacaoService } from '../service/cadastro-operacao.service';
import { Subscription } from 'rxjs';
import { GerenteService } from '../service/gerente.service';
import { first } from 'rxjs/operators';
import { isUndefined } from 'util';


@Component({
  selector: 'app-sequencia-operacional',
  templateUrl: './sequencia-operacional.component.html',
  preserveWhitespaces: false
})
export class SequenciaOperacionalComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private gerenteService: GerenteService, private modalService: NgbModal, private operacaoService: CadastroOperacaoService, private token: TokenStorageService, private router: Router) {
  }

  @ViewChild('closeModal') closeOpeModal: ElementRef;
  @ViewChild('modal') closeModalPeca: ElementRef;
  operacao: any = {};
  descricaopeca: string;
  descricaonewsubope: string;
  novaplanilhacusto: any = {};
  planilhacusto: any;
  newsuboperacao: any = {};
  suboperacaoEscolhida: any;
  subopesa = false;
  numfumok = false;
  gerente: any;
  operacaoEscolhida: any;
  newpeca: any = {};
  peca: any;
  listasuboperacoes: any = [];
  suboperacoes: any;
  numFun1: number;
  numFun2: number;
  qtdPeca1: number;
  qtdPeca2: number;
  public erro: boolean;
  public errorMessage = '';
  public info: any;
  sub: Subscription;
  public opeCadastrada = false;
  public validado: boolean;
  public carregado: boolean;
  resultadoOpe: any;
  isReadonly = true;
  pecaSelected = false;
  etapaSelected = false;
  public escolheu = false;
  ope2 = false;
  ope3 = false;

  atualizarOpe = false;
  valido = true;

  hoje: Date;
  inicio: Date;
  prazo: Date;

  andamento = false;

  etapas: any;
  etapa: any;
  cadastreSubOpe = false;

  cadastrarSubOpe = false;
  gerenteobj: any;
  atualizarPlanilha = false;
  resultadoPlanilha: any;

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

  pecaDescricao(descricao: any) {
    this.newpeca.descricao = descricao;
  }
  subopeDescricao(descricao: any) {
    this.newsuboperacao.descricao = descricao;
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

  selectEtapa(etapa: any) {
    this.etapa = etapa;
    if (this.etapa.etapaProducao === 'Acabamento' && this.listasuboperacoes.length <= 0) {
      this.operacaoService.getOperacoesSub().subscribe(data => {
        this.suboperacoes = data;
        if (this.escolheu) {
          this.suboperacoes.forEach((item, index) => {
            this.listasuboperacoes.push(item);
          });
          this.cadastreSubOpe = false;
        }
      }, error => {
        console.log(error.error);
      });
    } else {
      this.listasuboperacoes = [];
      this.suboperacoes = [];
      this.cadastreSubOpe = true;
    }

    this.etapaSelected = true;
    console.clear();
  }

  hintSubOpes() {
    if (this.cadastreSubOpe) {
      this.cadastrarSubOpe = true;
    }
  }

  datareload() {
    this.gerenteService.getGerente(this.info.username).subscribe(data => {
      this.gerente = data;

    }, error => {
      console.log(error.error);
    });
    this.operacaoService.getTiposOperacoes().subscribe(data => {
      this.etapas = data;
    });
    this.carregado = true;

  }

  atualizarSubOpe(subope: any, tempo: string) {
    this.suboperacaoEscolhida = subope;
    this.suboperacaoEscolhida.tempoNesc = +tempo;
  }

  segundosSubOpe(subope: any, segundos: string) {
    this.suboperacaoEscolhida = subope;
    this.suboperacaoEscolhida.segundos = +segundos;
  }

  subopes() {
    if (!this.ope2) {
      this.operacaoService.addOperacao(this.operacao).subscribe(data => {
        this.operacaoEscolhida = data;
      }, error => {
        this.erro = true;
        this.errorMessage = error.error;
        console.log(error.error);
      });
      this.ope2 = true;
    }
  }

  loteOpe(lote: any) {
    this.operacaoEscolhida.loteProducao = lote;
  }

  numfunOpe(numfun: any) {
    this.operacaoEscolhida.numFuncionariosDisponiveis = numfun;
  }

  cadastrar() {

    if (this.atualizarOpe) {

      this.update();
      console.log('OPE ATUALIZADA');

    } else {
      this.opeCadastrada = true;
      this.listasuboperacoes.forEach((item, index) => {
        item.id = null;
        item.idEtapa = 0;
        item.operacao_id = this.operacaoEscolhida.id;
      }, error => {
        console.log(error.error);
      });
      this.operacaoEscolhida.suboperacoes = this.listasuboperacoes;
      this.operacaoEscolhida.tempoTrab = 450;
      this.operacaoEscolhida.etapa_producao_id = this.etapa.id;
      this.operacaoEscolhida.descricao = this.etapa.etapaProducao + ' : ' + this.peca.descricao + ' #' + this.operacaoEscolhida.id;
      this.operacaoEscolhida.peca_id = this.peca.id;

      this.hoje = new Date();
      this.inicio = new Date(this.operacaoEscolhida.dataInicio);
      this.inicio.setDate(this.inicio.getDate() + 1);

      if (this.inicio > this.hoje) {
        this.peca.operacoesFazer.push(this.operacaoEscolhida);
        this.gerenteService.pecaOpesFazer(this.peca).pipe(first()).subscribe(peca => {
          this.getOpe();
          this.subopesa = false;
        }, error => {
          this.erro = true;
          this.errorMessage = error.error;
          console.log(error.error);
        });
      } else if (this.inicio.getTime() === this.hoje.getTime() || this.inicio < this.hoje) {
        this.peca.operacoesAndamento.push(this.operacaoEscolhida);
        this.gerenteService.pecaOpesAndamento(this.peca).pipe(first()).subscribe(peca => {
          this.getOpe();
        }, error => {
          this.erro = true;
          this.errorMessage = error.error;
          console.log(error.error);
        });
      }
    }
  }

  andamentoOpen() {
    this.andamento = true;
  }

  concluirOpe() {
    alert('Sequência Operacional concluída com sucesso!');
    this.router.navigateByUrl('/gerenteindex/homegerente', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/gerenteindex/operacoes/']));
  }

  andamentoClosed() {
    this.andamento = false;
  }

  updatePlanilha() {
    this.planilhacusto.custoMinuto = this.planilhacusto.custoMinuto.toFixed(2);
    this.planilhacusto.custoOpe = this.planilhacusto.custoOpe.toFixed(2);
    alert(this.planilhacusto.custoOpe + 'tofixed' + this.planilhacusto.custoOpe.toFixed(2));
    this.gerenteService.atualizarPlanilha(this.planilhacusto).pipe(first()).subscribe(data => {
    }, error => {
      this.errorMessage = error.error;
    });
  }

  cadastrarPlanilha() {
    if (this.atualizarPlanilha) {
      this.updatePlanilha();
      console.log('planilha ATUALIZADA');
    } else {
      console.log('planilha cadastrada');
      this.gerenteService.addPlanilha(this.novaplanilhacusto).subscribe(data => {
        this.planilhacusto = data;
        this.planilhacusto.operacao_id = this.resultadoOpe.id;
        // this.operacaoEscolhida.planilhacusto_id = this.novaplanilhacusto.id;
        this.planilhacusto.descricaoOpe = this.resultadoOpe.descricao;
        this.planilhacusto.tempos = this.resultadoOpe.tempos;
        this.planilhacusto.lote = this.resultadoOpe.loteProducao;
        this.planilhacusto.numFunOpe = this.resultadoOpe.numFuncionariosDisponiveis;
        this.planilhacusto.gerente_id = this.gerente.id;
        this.planilhacusto.gastos = this.gerente.gastosfixo;
        this.planilhacusto.diasNeceOpe = this.resultadoOpe.diasUteisNecessarios;
        this.gerente.planilhascusto.push(this.planilhacusto);
        this.gerenteService.cadastrarPlanilha(this.gerente).pipe(first()).subscribe(item => {
          this.getdadosCustos();
          this.update();
          this.atualizarPlanilha = true;
        }, error => {
          this.errorMessage = error.error;
        });
      }, error => {
        this.errorMessage = error.error;
      });

    }
  }

  getdadosCustos() {
    this.gerenteService.getPlanilhaId(this.planilhacusto.id).subscribe(data => {
      this.resultadoPlanilha = data;
    }, error => {
      this.errorMessage = error.error;
    });
  }

  getOpe() {

    this.operacaoService.getOperacaoId(this.operacaoEscolhida.id).subscribe(data => {
      this.resultadoOpe = data;
      this.cadastrarPlanilha();
      this.ope3 = true;
      this.atualizarOpe = true;
      this.prazo = new Date(this.resultadoOpe.prazo);
      this.prazo.setDate(this.prazo.getDate() + 1);
      if (this.resultadoOpe.numFuncionariosDisponiveis >= this.resultadoOpe.numFuncionarios) {
        this.numfumok = true;
      }
    }, error => {
      this.erro = true;
      this.errorMessage = error.error;
      console.log(error.error);
    });

  }

  update() {

    this.operacaoService.updateOperacao(this.operacaoEscolhida).pipe(first()).subscribe(data => {
      this.resultadoOpe = data;
      this.cadastrarPlanilha();
    }, error => {
      this.erro = true;
      this.errorMessage = error.error;
      console.log(error.error);
    });

    this.numFun1 = this.resultadoOpe.numFuncionarios - 2;
    this.numFun2 = this.resultadoOpe.numFuncionarios + 2;
    this.qtdPeca1 = this.resultadoOpe.qtdPecasOpe - 2;
    this.qtdPeca2 = this.resultadoOpe.qtdPecasOpe + 2;
  }

  cadastrarSubOperacao() {
    this.newsuboperacao.descricao = this.descricaonewsubope;
    this.listasuboperacoes.push(this.newsuboperacao);
    this.cadastreSubOpe = false;
  }

  deletarSubOperacao(subope: any) {
    this.suboperacaoEscolhida = subope;

    const index = this.listasuboperacoes.indexOf(this.suboperacaoEscolhida);
    this.listasuboperacoes.splice(index, 1);
    if (this.listasuboperacoes.length <= 0) {
      this.cadastreSubOpe = true;
    }
  }

  pecasrefresh() {
    this.gerenteService.getGerente(this.info.username).subscribe(data => {
      this.gerenteobj = data;
      this.gerente.pecas.forEach((peca, index) => {
        if (isUndefined(peca.operacoesFazer) || isUndefined(peca.operacoesAndamento) || isUndefined(peca.operacoesPrazo)) {
          this.gerente = this.gerenteobj;
        }
      });
    }, error => {
      console.log(error.error);
    });
  }

  cadastrarPeca() {
    // this.newpeca.etapa_producao_id = this.etapa.id;
    this.newpeca.descricao = this.descricaopeca;

    this.newpeca.gerente_id = this.gerente.id;
    this.gerente.pecas.push(this.newpeca);
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
      this.descricaopeca = '';
      alert('Peça cadastrada com sucesso!');
      this.pecasrefresh();
      // this.router.navigateByUrl('/gerenteindex/homegerente', {skipLocationChange: true}).then(() =>
      //   this.router.navigate(['/gerenteindex/operacoes/']));

    }, error => {
      this.erro = true;
      this.errorMessage = error.error;
      console.log(error.error);
    });
  }

  trackByFn(operacao) {
    return operacao.id;
  }

  subopeEscolhida(subope: any) {
    this.suboperacaoEscolhida = subope;
    this.descricaonewsubope = '';
  }

  selectsPeca(peca: any) {
    this.peca = peca;

    if (!this.escolheu) {
      this.suboperacoes.forEach((item, index) => {
        this.listasuboperacoes.push(item);
      });
      this.escolheu = true;
      this.suboperacoes = null;
    }
  }

}
