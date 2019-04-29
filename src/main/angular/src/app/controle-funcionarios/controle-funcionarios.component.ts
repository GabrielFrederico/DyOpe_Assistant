import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-controle-funcionarios',
  templateUrl: './controle-funcionarios.component.html'
})
export class ControleFuncionariosComponent implements OnInit {

  public info: any;
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.naoAutenticado()
  }
  constructor(private modalService: NgbModal, private token: TokenStorageService, private router: Router) {}

  private validado: boolean;
  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_GERENTE') {
      this.validado = false;
      this.router.navigate(['/logingerente']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }}
