import { Component, OnInit } from '@angular/core';
import {Gerente, GerenteService} from '../service/gerente.service';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html'
})
export class GerenteComponent implements OnInit {

  gerentes: Gerente[];

  constructor(
    private httpClientService: GerenteService
  ) { }

  ngOnInit() {
    this.httpClientService.getGerentes().subscribe(
      response => {this.gerentes = response; }
    );
  }

  handleSuccesfulResponse(response) {
    this.gerentes = response;
  }
}
