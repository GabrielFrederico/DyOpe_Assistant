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
  gerente: any;
  operacaoEscolhida: any;
  newpeca: any = {};
  peca: any;
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

  isReadonly = true;

  public escolheu = false;

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
    });
    this.operacaoService.getSubOperacoes().subscribe(data => {
      this.suboperacoes = data;
    });
    this.carregado = true;
    console.clear();
  }

  atualizarSubOpe() {
    this.operacaoService.updateSubOperacao(this.suboperacaoEscolhida).pipe(first()).subscribe(data => {
    });
  }

  cadastrar() {
    this.operacao.etapa_producao_id = this.etapaproducao.id;
    this.operacao.peca_id = this.peca.id;
    this.operacao.operacoes = this.suboperacoes;
    this.peca.operacoes.push(this.operacao);
    this.gerenteService.atualizarPeca(this.peca).pipe(first()).subscribe(data => {
    }, error => {
      alert(error);
    });
    this.operacaoService.getOperacao(this.operacao).subscribe(data => {
      this.operacaoEscolhida = data;
    });
    this.opeEscolida = true;
    this.escolheu = true;
  }

  atualizar() {
    this.operacaoService.updateOperacao(this.operacao).pipe(first()).subscribe(data => {
      alert('Operação Cadastrada!');
    });
  }

  cadastrarSubOperacao() {
    this.newsuboperacao.operacao_id = this.operacao.id;
    this.operacao.operacoes.push(this.newsuboperacao);

    this.atualizar();

  }

  cadastrarPeca() {
    this.newpeca.etapa_producao_id = this.etapaproducao.id;
    this.newpeca.gerente_id = this.gerente.id;
    this.gerente.pecas.push(this.newpeca);
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
      alert('Peça cadastrada com sucesso!');
    }, error => {
      alert(error);
    });
  }

  trackByFn(operacao) {
    return operacao.id;
  }

  subopeEscolhida(subope: any) {
    this.suboperacaoEscolhida = subope;
    this.atualizarSubOpe();
  }

  selectsPeca(peca: any) {
    this.peca = peca;
    this.peca.operacoes = this.peca.operacoes.filter(ope => {
      return ope.etapa_producao_id === this.etapaproducao.id;
    });
    if (!this.opeEscolida) {
      this.cadastrar();
    } else {
      this.escolheu = true;
    }


  }


  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }
}
