import { Component, OnInit } from '@angular/core';
import {Gerente, HttpClientService} from '../service/httpclient.service';

@Component({
  selector: 'app-cadastro-gerente',
  templateUrl: './cadastro-gerente.component.html'
})
export class CadastroGerenteComponent implements OnInit {

  gerente: Gerente = new Gerente('');

  constructor(
    private httpClientService: HttpClientService
  ) { }

  ngOnInit() {
  }

  cadastrarGerente(): void {
    this.httpClientService.cadastrarGerente(this.gerente)
      .subscribe( data => {
        alert('Gerente cadastrado com sucesso!');
      });

  }
}
