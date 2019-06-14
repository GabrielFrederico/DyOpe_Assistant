import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CadastroOperacaoService, Operacao} from '../service/cadastro-operacao.service';
import {Subscription} from 'rxjs';
import {GerenteService} from '../service/gerente.service';
import {List} from 'immutable';


@Component({
  selector: 'app-andamento-operacoes',
  templateUrl: './andamento-operacoes.component.html',
  preserveWhitespaces: false
})
export class AndamentoOperacoesComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private gerenteService: GerenteService, private modalService: NgbModal, private operacaoService: CadastroOperacaoService, private token: TokenStorageService, private router: Router) {
  }

  operacao: any = {};
  gerente: any;
  ope: Operacao;
  operacoesFazer: any;
  operacoesEmAndamento: any;
  operacoesNoPrazo: any;
  etapaproducao: any;
  public erro: boolean;
  public errorMessage = '';
  closeResult: string;
  public info: any;
  sub: Subscription;
  peca: any;
  public validado: boolean;
  private cadastrado: boolean;

  isReadonly = true;
  operacaoEscolhida: any;

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

  selectOperacao(operacao: any) {
    this.operacaoEscolhida = operacao;
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
              console.clear();
            }
          }
        )
        ;
      }
    });
  }

  datareload() {
    this.gerenteService.getGerente(this.info.username).subscribe(data => this.gerente = data);

    this.gerente.operacoesFazer = this.gerente.operacoesFazer.filter(ope => {
      return ope.etapa_producao_id === this.etapaproducao.id;
    });

    console.clear();

  }


  trackByFn(operacao) {
    return operacao.id;
  }


  toggleReadonly() {
    this.isReadonly = !this.isReadonly;

  }
}
