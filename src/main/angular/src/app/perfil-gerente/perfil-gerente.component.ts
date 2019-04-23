import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {cadastroGerenteInfo, Gerente, loginGerenteInfo} from '../service/gerente.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-perfil-gerente',
  templateUrl: './perfil-gerente.component.html'
})
export class PerfilGerenteComponent implements OnInit {

  constructor(private modalService: NgbModal, private token: TokenStorageService, private router: Router) { }
  public info: any;
  form: any = {};
  public isCollapsed = false;
  closeResult: string;

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  openLogout(content) {
    this.modalService.open(content, { size: 'sm', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${PerfilGerenteComponent.getDismissReason(reason)}`;
    });
  }
  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
  }

  naoAutenticado() {
    if (this.info.token) {
    } else {
      this.router.navigate(['/logingerente'])
      alert('Acesse Negado! Faça o Login!');
    }
  }
}
