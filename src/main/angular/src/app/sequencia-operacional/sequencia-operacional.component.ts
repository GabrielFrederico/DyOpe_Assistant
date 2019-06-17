import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CadastroOperacaoService} from '../service/cadastro-operacao.service';
import {Subscription} from 'rxjs';
import {GerenteService} from '../service/gerente.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-sequencia-operacional',
  templateUrl: './sequencia-operacional.component.html',
  preserveWhitespaces: false

})
export class SequenciaOperacionalComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private gerenteService: GerenteService, private modalService: NgbModal, private operacaoService: CadastroOperacaoService, private token: TokenStorageService, private router: Router) {
  }

  @ViewChild('closeModal') closeOpeModal: ElementRef;
  @ViewChild('modal') closeModalPeca: ElementRef;
  operacao: any = {};
  newsuboperacao: any = {};
  suboperacaoEscolhida: any;
  subope: any = {};
  gerente: any;
  operacaoEscolhida: any;
  newpeca: any = {};
  peca: any;
  listasuboperacoes: any = [];
  suboperacoes: any;
  etapaproducao: any;
  public erro: boolean;
  public errorMessage = '';
  closeResult: string;
  public info: any;
  etapa: string;
  idope: string;
  sub: Subscription;
  public opeCadastrada = false;
  public validado: boolean;
  public carregado: boolean;
  public modal = 'modal fade cadastrar-peca';
  public modalOpen = false;
  resultadoOpe: any;
  isReadonly = true;

  public escolheu = false;
  ope2 = false;
  ope3 = false;

  atualizarOpe = false;

  ngOnInit() {
    this.etapasproducao();
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.datareload();
    this.naoAutenticado();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openCadastro(cadastro) {
    this.modalService.open(cadastro, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openInformacoes(content) {
    this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
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

  etapasproducao() {
    this.sub = this.route.params.subscribe(params => {
      const etapaProducao = params.etapaProducao;
      if (etapaProducao) {
        this.operacaoService.getEtapaProducaoNome(etapaProducao).subscribe((etapaproducao: any) => {
          if (etapaproducao) {
            this.etapaproducao = etapaproducao;
            this.etapa = this.etapaproducao.id.toString();
            console.clear();
            if (this.etapaproducao.id === 5) {
              this.operacaoService.getOperacoesSub().subscribe(data => {
                this.suboperacoes = data;

              }, error => {
                console.log(error.error);
              });
            } else {
              this.suboperacoes = [];
            }

          }
        });
      } else {
        this.router.navigate(['**']);
      }
    });

  }

  datareload() {
    this.gerenteService.getGerente(this.info.username).subscribe(data => {
      this.gerente = data;

    }, error => {
      console.log(error.error);
    });


    this.carregado = true;

  }

  atualizarSubOpe(subope: any, tempo: any) {
    this.suboperacaoEscolhida = subope;
    this.suboperacaoEscolhida.tempoNesc = tempo;
  }

  subopes() {


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

      this.operacaoEscolhida.etapa_producao_id = this.etapaproducao.id;
      this.operacaoEscolhida.peca_id = this.peca.id;
      this.operacaoEscolhida.descricao = this.etapaproducao.etapaProducao + ' : ' + this.peca.descricao;
      this.peca.operacoes.push(this.operacaoEscolhida);
      /** this.peca.operacoes = this.peca.operacoes.filter(ope => {
       *  return ope.etapa_producao_id === this.etapaproducao.id;
       * });
       */

      this.atualizar();

    }
  }

  update() {
    // this.resultadoOpe.suboperacoes =  this.operacaoEscolhida.suboperacoes;
    this.operacaoService.updateOperacao(this.operacaoEscolhida).pipe(first()).subscribe(data => {
      this.resultadoOpe = data;
      this.ope3 = false;
      this.ope3 = true;
      // this.router.navigate(['/gerenteindex/andamentooperacoes/', this.etapaproducao.etapaProducao]);
    }, error => {
      this.erro = true;
      this.errorMessage = error.error;
      console.log(error.error);
    });
    const hoje: Date = new Date();
    const inicio: Date = new Date(this.resultadoOpe.dataInicio);
    const prazo: Date = new Date(this.resultadoOpe.prazo);


  }

  atualizar() {

    this.gerenteService.atualizarPeca(this.peca).pipe(first()).subscribe(peca => {

      this.operacaoService.updateOperacao(this.operacaoEscolhida).pipe(first()).subscribe(data => {
        this.resultadoOpe = data;
        console.clear();
        // this.router.navigate(['/gerenteindex/andamentooperacoes/', this.etapaproducao.etapaProducao]);
      }, error => {
        console.log(error.error);
      });
      const hoje: Date = new Date();
      const inicio: Date = new Date(this.resultadoOpe.dataInicio);
      const prazo: Date = new Date(this.resultadoOpe.prazo);
      this.resultadoOpe.gerente_id = this.gerente.id;
      if (inicio === hoje || inicio < hoje) {
        this.gerente.operacoesAndamento.push(this.resultadoOpe);
      } else if (inicio > hoje) {
        this.gerente.operacoesFazer.push(this.resultadoOpe);
        this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
        }, error => {
          this.erro = true;
          this.errorMessage = error.error;
          console.log(error.error);
        });
      }
    }, error => {
      console.log(error.error);
    });
    this.ope3 = true;
    this.atualizarOpe = true;

  }

  cadastrarSubOperacao() {
    this.listasuboperacoes.push(this.newsuboperacao);
    alert('Informe os tempos!');
  }

  deletarSubOperacao(subope: any) {

    this.suboperacaoEscolhida = subope;
    const index = this.listasuboperacoes.indexOf(this.suboperacaoEscolhida);
    this.listasuboperacoes.splice(index, 1);

  }

  cadastrarPeca() {
    this.newpeca.etapa_producao_id = this.etapaproducao.id;
    this.newpeca.gerente_id = this.gerente.id;
    this.gerente.pecas.push(this.newpeca);
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
      alert('Peça cadastrada com sucesso!');
      this.router.navigateByUrl('/gerenteindex/homegerente', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/gerenteindex/operacoes/', this.etapaproducao.etapaProducao]));

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

  }

  selectsPeca(peca: any) {
    this.peca = peca;

    if (this.listasuboperacoes.length <= 0 && !this.escolheu) {

      this.suboperacoes.forEach((item, index) => {
        this.listasuboperacoes.push(item);

      });
    }
    if (!this.ope2) {
      this.operacaoService.addOperacao(this.operacao).subscribe(data => {
        this.operacaoEscolhida = data;
        this.ope2 = true;
      }, error => {
        this.erro = true;
        this.errorMessage = error.error;
        console.log(error.error);
      });
    }

    this.escolheu = true;

  }


  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }
}
