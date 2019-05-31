import { Component, OnInit, Input } from '@angular/core';
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import { Observable } from 'rxjs';
import { Funcionario, FuncionarioService } from '../service/funcionario.service';

@Component({
  selector: 'app-funcionario-index',
  templateUrl: './funcionario-index.component.html'
})
export class FuncionarioIndexComponent implements OnInit {
  info: any;
  form: any = {};
  public isCollapsed = false;

  @Input() funcionarioObjeto: Observable<Funcionario>;
  @Input() funcionario: Funcionario;
  closeResult: string;
  private roles: string[];
  private authority: string;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.datareload();
    this.naoAutenticado()
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_FUNCIONARIO') {
          this.authority = 'funcionario';
          return true;
        } else if (role === 'ROLE_FUNCIONARIO') {
          this.authority = 'funcionario';
          return true;
        }
      });
    }


  }

  constructor(private modalService: NgbModal, private funcionarioService: FuncionarioService, private token: TokenStorageService, private  router: Router) {
  }


  logout() {
    this.token.logOut();
    window.location.reload();
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
  datareload() {
    this.funcionarioObjeto = this.funcionarioService.getFuncionarioLogado(this.info.username);
    this.funcionarioObjeto.subscribe(data => {
      this.funcionario = data;
      console.clear();
    })
  }
  public validado: boolean;
  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_FUNCIONARIO') {
      this.validado = false;
      this.router.navigate(['/loginfuncionario']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }

}
