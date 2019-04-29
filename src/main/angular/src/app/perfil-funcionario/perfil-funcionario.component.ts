import {Component, Input, OnInit} from '@angular/core';
import {InfosetorService} from "../service/infosetor.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../auth/token-storage.service";
import {Funcionario, FuncionarioService} from "../service/funcionario.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-perfil-funcionario',
  templateUrl: './perfil-funcionario.component.html'
})
export class PerfilFuncionarioComponent implements OnInit {
  @Input() funcionarios: Observable<Funcionario[]>;
  info: any;
  form: any = {};
  public isCollapsed = false;

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
    this.datareload();
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

  constructor(private http: InfosetorService,
              private router: Router, private funcionarioService: FuncionarioService, private modalService: NgbModal, private token: TokenStorageService) {
  }

  datareload() {
    this.funcionarios = this.funcionarioService.getFuncionarios();
  }

  private validado: boolean;
  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_FUNCIONARIO') {
      this.validado = false;
      this.router.navigate(['/loginfuncionario']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }

  isReadonly = true;

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }
}
