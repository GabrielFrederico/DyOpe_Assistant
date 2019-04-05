import { Component, OnInit } from '@angular/core';
import {Gerente, HttpClientService} from '../service/httpclient.service';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html'
})
export class GerenteComponent implements OnInit {

  gerentes: Gerente[];

  constructor(
    private httpClientService: HttpClientService
  ) { }

  ngOnInit() {
    this.httpClientService.getGerentes().subscribe(
      response => this.handleSuccesfulResponse(response),
    );
  }

  handleSuccesfulResponse(response) {
    this.gerentes = response;
  }
}
