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
  public opeEscolida = false;
  public validado: boolean;
  public carregado: boolean;
  public modal = 'modal fade cadastrar-peca';
  public modalOpen = false;

  isReadonly = true;

  public escolheu = false;
  ope2 = false;
  ope3 = false;

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
            this.operacaoService.getOperacoesSub().subscribe(data => {
              this.suboperacoes = data;

            }, error => {
              console.log(error.error);
            });
          }
        });
      } else {
        this.router.navigate(['/**']);
      }
    });
  }

  datareload() {
    this.gerenteService.getGerente(this.info.username).subscribe(data => {
      this.gerente = data;

    }, error => {
      console.log(error.error);
    });


    // alert(this.suboperacoes);
    this.carregado = true;

  }

  atualizarSubOpe() {
    this.operacaoService.updateSubOperacao(this.suboperacaoEscolhida).pipe(first()).subscribe(data => {
    }, error => {
      console.log(error.error);
    });
  }

  subopes() {
    this.operacaoService.addOperacao(this.operacao).subscribe(data => {
      this.operacaoEscolhida = data;
      this.ope2 = true;
    }, error => {
      console.log(error.error);
    });

  }

  cadastrar() {

    this.listasuboperacoes.forEach((item, index) => {
      item.operacao_id = this.operacaoEscolhida.id;
      this.operacaoEscolhida.suboperacoes.push(item);
    }, error => {
      console.log(error.error);
    });

    this.operacaoEscolhida.etapa_producao_id = this.etapaproducao.id;
    this.operacaoEscolhida.peca_id = this.peca.id;
    this.peca.operacoes.push(this.operacaoEscolhida);
    /** this.peca.operacoes = this.peca.operacoes.filter(ope => {
     *  return ope.etapa_producao_id === this.etapaproducao.id;
     * });
     */
    this.gerenteService.atualizarPeca(this.peca).pipe(first()).subscribe(data => {
      this.atualizar();
    }, error => {
      console.log(error.error);
    });
    this.ope3 = true;
  }

  atualizar() {
    this.operacaoService.updateOperacao(this.operacaoEscolhida).pipe(first()).subscribe(data => {

      // this.router.navigate(['/gerenteindex/andamentooperacoes/', this.etapaproducao.etapaProducao]);
    }, error => {
      console.log(error.error);
    });
  }

  cadastrarSubOperacao() {
    this.listasuboperacoes.push(this.newsuboperacao);
  }

  deletarSubOperacao() {
  }

  cadastrarPeca() {
    this.newpeca.etapa_producao_id = this.etapaproducao.id;
    this.newpeca.gerente_id = this.gerente.id;
    this.gerente.pecas.push(this.newpeca);
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
      alert('Peça cadastrada com sucesso!');
      this.modal = 'modal fade cadastrar-peca';
      this.modalOpen = true;
    }, error => {
      alert(error);
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
    this.escolheu = true;


    this.suboperacoes.forEach((item, index) => {
      this.subope = item;
      this.subope.id = null;
      this.listasuboperacoes.push(this.subope);


    });

  }


  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }
}
