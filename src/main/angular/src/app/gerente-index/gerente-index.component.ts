import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from "../auth/token-storage.service";
import {loginGerenteInfo} from "../service/gerente.service";


@Component({
  selector: 'app-gerente-index',
  templateUrl: './gerente-index.component.html'
})
export class GerenteIndexComponent implements OnInit {
  info: any;
  form: any = {};
  public isCollapsed = false;
  closeResult: string;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      password: this.token.getPassword()
    };
  }

  constructor(private modalService: NgbModal, private token: TokenStorageService) {
  }


  logout() {
    this.token.logOut();
    window.location.reload();
  }

  openLogout(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }
}
