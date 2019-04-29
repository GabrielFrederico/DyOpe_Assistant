import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navegacao',
  templateUrl: './navegacao.component.html'
})
export class NavegacaoComponent implements OnInit {
  info: any;

  constructor(private token: TokenStorageService, private router: Router) {
  }

  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.logOut();
    this.router.navigate(['/']);
  }
}
