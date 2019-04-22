import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../auth/token-storage.service";

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
  }
  constructor(private modalService: NgbModal, private token: TokenStorageService) {}


}
