import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CadastroOperacaoService, Operacao, EtapaProducao } from '../service/cadastro-operacao.service';
import { Observable, Subscription } from "rxjs";
import { Gerente, GerenteService } from '../service/gerente.service';
import { first } from "rxjs/operators";
import { List } from 'immutable';

@Component({
  selector: 'app-operacao-risco',
  templateUrl: './operacao-risco.component.html'
})
export class OperacaoRiscoComponent implements OnInit {
  @Input() operacao: Operacao = new Operacao();
  @Input() gerente: Gerente;
  @Input() gerenteObjeto: Observable<Gerente>;
  @Input() gerentes: Observable<Gerente[]>;
  @Input() tipoOpe: EtapaProducao;
  @Input() operacoes: Operacao[];
  public erro: boolean;
  public errorMessage = '';
  closeResult: string;
  public info: any;
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

  }

  constructor(private route: ActivatedRoute, private gerenteService: GerenteService, private modalService: NgbModal, private operacaoService: CadastroOperacaoService, private token: TokenStorageService, private router: Router) {
  }


  openCadastro(cadastro) {
    this.modalService.open(cadastro, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openInformacoes(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  private validado: boolean;
  private cadastrado: boolean;
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
      const id = params['id'];
      if (id) {
        this.operacaoService.getEtapaProducao(id).subscribe((tipoope: any) => {
          if (tipoope) {
            this.tipoOpe = tipoope;
            console.clear();
          }
        })
      }
    })
  }
  datareload() {
    this.gerenteObjeto = this.gerenteService.getGerenteLogado(this.info.username);
    this.gerenteObjeto.subscribe(data => {
      this.gerente = data;
      this.gerente.etapasproducao.push(this.tipoOpe);
      this.operacoes = this.tipoOpe.operacoes;

    })
  }


  cadastrar() {
    this.tipoOpe.gerente_id = this.gerente.id;
    this.operacao.id_tipo_ope = this.tipoOpe.idTipoOpe;
    this.gerenteService.cadastrarOperacao(this.gerente).pipe(first()).subscribe(data => {
      alert("Operação cadastrada com sucesso!")

      this.getDismissReason(ModalDismissReasons.BACKDROP_CLICK);
    }, error => { alert(error) });

  }
  trackByFn(index, operacao) {
    return operacao.id;
  }

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;

  }
}
