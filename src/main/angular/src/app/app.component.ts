import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "./auth/token-storage.service";
import {Gerente} from "./service/gerente.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @Input() gerente: Gerente;
  @Input() gerentes: Observable<Gerente[]>;
  private roles: string[];
  private authority: string;

  constructor(private tokenStorage: TokenStorageService) {
  }

  gerenteLogado() {

  }

  ngOnInit() {

    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
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
}


