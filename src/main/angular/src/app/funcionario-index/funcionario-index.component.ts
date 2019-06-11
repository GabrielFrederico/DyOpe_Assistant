import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {Router} from '@angular/router';
import {FuncionarioService} from '../service/funcionario.service';

@Component({
  selector: 'app-funcionario-index',
  templateUrl: './funcionario-index.component.html'
})
export class FuncionarioIndexComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  constructor(private modalService: NgbModal, private funcionarioService: FuncionarioService, private token: TokenStorageService, private  router: Router) {
  }

  info: any;
  form: any = {};
  public isCollapsed = false;

  classidebar = 'sidebar bg-primary navbar-nav';


  closeResult: string;
  private roles: string[];
  private authority: string;

  toggled = false;

  public validado: boolean;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.naoAutenticado();

  }

  sidebar() {
    if (this.toggled) {
      this.classidebar = 'sidebar bg-primary navbar-nav';
      this.toggled = false;
    } else {
      this.classidebar = 'sidebar bg-primary navbar-nav toggled';
      this.toggled = true;
    }
  }

  logout() {
    this.token.logOut();
    this.router.navigate(['/loginfuncionario']);
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
    if (this.info.authorities.toString() !== 'ROLE_FUNCIONARIO') {
      this.validado = false;
      this.router.navigate(['/loginfuncionario']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }

}
