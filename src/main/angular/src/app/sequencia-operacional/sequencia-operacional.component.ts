import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CadastroOperacaoService, EtapaProducao, Operacao, SubOperacao} from '../service/cadastro-operacao.service';
import {Observable, Subscription} from 'rxjs';
import {Gerente, GerenteService, Peca} from '../service/gerente.service';
import {first} from 'rxjs/operators';


@Component({
  selector: 'app-sequencia-operacional',
  templateUrl: './sequencia-operacional.component.html',
  preserveWhitespaces: false

})
export class SequenciaOperacionalComponent implements OnInit, OnDestroy {
  operacao: Operacao = new Operacao();
  suboperacao: SubOperacao = new SubOperacao;
  suboperacaoEscolhida: SubOperacao = new SubOperacao;
  @Input() gerente: Gerente;
  @Input() operacaoEscolhida: Operacao;
  gerenteObjeto: Observable<Gerente>;
  newpeca: Peca = new Peca();
  @Input() peca: Peca;
  suboperacoesObj: Observable<SubOperacao[]>;
  @Input() suboperacoes: SubOperacao[];
  @Input() operacoes: Operacao[];
  @Input() etapaproducao: EtapaProducao;
  public erro: boolean;
  public errorMessage = '';
  closeResult: string;
  public info: any;
  etapa: string;
  idope: string;
  sub: Subscription;

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

    if (this.escolheu) {
      this.peca.operacoes = this.gerente.operacoes.filter(ope => {
        return ope.etapa_producao_id === this.etapaproducao.id;
      });
      if (this.peca.operacoes.length === 0) {
        this.operacaoEscolhida = this.operacao;
      } else {
        for (let operacao of  this.peca.operacoes) {
          if (operacao.peca_id === this.peca.id) {
            this.operacaoEscolhida = operacao;
            if (this.operacaoEscolhida.suboperacoes.length === 0) {
              this.operacaoEscolhida.suboperacoes = this.suboperacoes;
            }

          }
        }
      }
    }
  }

  constructor(private route: ActivatedRoute, private gerenteService: GerenteService, private modalService: NgbModal, private operacaoService: CadastroOperacaoService, private token: TokenStorageService, private router: Router) {
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

  public validado: boolean;
  public carregado: boolean;

  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_GERENTE') {
      this.validado = false;
      this.router.navigate(['/logingerente']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }

  isReadonly = true;

  etapasproducao() {
    this.sub = this.route.params.subscribe(params => {
      const etapaProducao = params['etapaProducao'];
      if (etapaProducao) {
        this.operacaoService.getEtapaProducaoNome(etapaProducao).subscribe((etapaproducao: EtapaProducao) => {
          if (etapaproducao) {
            this.etapaproducao = etapaproducao;
            this.etapa = this.etapaproducao.id.toString();
            console.clear();
          }
        })
      } else {
        this.router.navigate(['/**']);
      }
    })
  }

  datareload() {
    this.gerenteObjeto = this.gerenteService.getGerenteLogado(this.info.username);
    this.gerenteObjeto.subscribe(data => {
        this.gerente = data;
      }
    );
    this.suboperacoesObj = this.operacaoService.getSubOperacoes();
    this.suboperacoesObj.subscribe(data => {
      this.suboperacoes = data
    });
    this.carregado = true;
    console.clear();
  }

  cadastrar() {
    this.operacao.etapa_producao_id = this.etapaproducao.id;
    this.operacao.gerente_id = this.gerente.id;
    this.operacao.peca_id = this.peca.id;
    this.peca.operacoes.push(this.operacao);
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
      alert('Operação cadastrada com sucesso!')
    }, error => {
      alert(error)
    });
  }

  atualizar() {
    this.operacaoService.updateOperacao(this.operacaoEscolhida);
  }

  cadastrarSubOperacao() {
    alert(this.operacaoEscolhida.id);
    this.suboperacao.operacao_id = this.operacaoEscolhida.id;
    this.operacaoEscolhida.suboperacoes.push(this.suboperacao);
    this.atualizar();
    // this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
    //   alert('SubOperação cadastrada com sucesso!')
    //  }, error => {
    //    alert(error)
    //  });
    //

  }

  cadastrarPeca() {
    this.newpeca.etapa_producao_id = this.etapaproducao.id;
    this.newpeca.gerente_id = this.gerente.id;
    this.gerente.pecas.push(this.newpeca);
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
      alert('Peça cadastrada com sucesso!')
    }, error => {
      alert(error)
    });
  }

  trackByFn(operacao) {
    return operacao.id;
  }

  public escolheu = false;

  selectsPeca(peca: Peca) {
    this.peca = peca;
    this.escolheu = true;
    this.peca.operacoes = this.gerente.operacoes.filter(ope => {
      return ope.etapa_producao_id === this.etapaproducao.id;
    });
    alert(this.peca.operacoes.length);
    if (this.peca.operacoes.length === 0) {

    } else {
      for (let operacao of  this.peca.operacoes) {
        if (operacao.peca_id === this.peca.id) {
          this.operacaoEscolhida = operacao;
          if (this.operacaoEscolhida.suboperacoes.length === 0) {
            this.operacaoEscolhida.suboperacoes = this.suboperacoes;
          }

        }
      }
    }

  }

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }
}
