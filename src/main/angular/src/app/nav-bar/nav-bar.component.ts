import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  info: any;
  public isCollapsed = false;
  closeResult: string;
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  constructor(private modalService: NgbModal, private token: TokenStorageService, private router: Router) {
  }

  logout() {
    this.token.logOut();
    this.router.navigate(['/']);
  }

  openLogout(content) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${NavBarComponent.getDismissReason(reason)}`;
    });
  }

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
