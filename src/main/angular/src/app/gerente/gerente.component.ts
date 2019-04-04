import { Component, OnInit } from '@angular/core';
import {HttpclientService} from '../service/httpclient.service';

@Component({
  selector: 'app-gerente',
  templateUrl: './gerente.component.html'
})
export class GerenteComponent implements OnInit {

  gerentes: string[];

  constructor(
    private httpClientService: HttpclientService
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
