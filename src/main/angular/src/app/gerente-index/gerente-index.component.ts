import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';
import {EtapaProducao, CadastroOperacaoService} from '../service/cadastro-operacao.service';
import { Observable } from 'rxjs';

  ChangeDetectionStrategy.OnPush
@Component({
  selector: 'app-gerente-index',
  templateUrl: './gerente-index.component.html',
  preserveWhitespaces: false
})
export class GerenteIndexComponent implements OnInit {

  title = 'DyOpe Assistant';
  info: any;
  form: any = {};
  public isCollapsed = false;
  @Input() tiposOperacao: Observable<EtapaProducao[]>;

  closeResult: string;
  private roles: string[];
  private authority: string;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.naoAutenticado()
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_GERENTE') {
          this.authority = 'gerente';
          return true;
        } else if (role === 'ROLE_FUNCIONARIO') {
          this.authority = 'funcionario';
          return true;
        }
      });
    }


  }

  constructor(private modalService: NgbModal,private tipoOpeservice: CadastroOperacaoService, private token: TokenStorageService, private  router: Router) {
  }


  logout() {
    this.token.logOut();
  }

 dataReload(){
  this.tiposOperacao = this.tipoOpeservice.getTiposOperacoes();

 }

  openLogout(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_GERENTE') {
      this.validado = false;
      this.router.navigate(['/logingerente']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }
}
