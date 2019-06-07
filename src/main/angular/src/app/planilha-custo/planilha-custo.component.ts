import { Component, OnInit } from '@angular/core';
import { GerenteService } from '../service/gerente.service';
import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-planilha-custo',
  templateUrl: './planilha-custo.component.html',
  styleUrls: ['./planilha-custo.component.css']
})
export class PlanilhaCustoComponent implements OnInit {

  constructor(private gerente: GerenteService, private token: TokenStorageService) {
  }
  public info: any;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
  }

  cadastrarPlanilha() {

  }

}
