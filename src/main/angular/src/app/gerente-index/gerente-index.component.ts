import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {loginGerenteInfo} from '../service/gerente.service';
import {Router} from '@angular/router';
import {NavBarComponent} from "../nav-bar/nav-bar.component";


@Component({
  selector: 'app-gerente-index',
  templateUrl: './gerente-index.component.html'
})
export class GerenteIndexComponent implements OnInit {
  info: any;
  form: any = {};
  public isCollapsed = false;
  navbar: NavBarComponent;
  closeResult: string;
  private roles: string[];
  private authority: string;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      password: this.token.getPassword()
    };
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

  constructor(private modalService: NgbModal, private token: TokenStorageService, private  router: Router) {
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

  naoAutenticado() {
    if (this.info.token) {
    } else {
      this.router.navigate(['/logingerente'])

      alert('Acesse Negado! Faça o Login!');
    }
  }
}
