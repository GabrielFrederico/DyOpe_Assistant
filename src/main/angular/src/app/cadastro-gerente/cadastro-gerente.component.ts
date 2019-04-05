import { Component, OnInit } from '@angular/core';
import {Gerente, HttpClientService} from '../service/httpclient.service';

@Component({
  selector: 'app-cadastro-gerente',
  templateUrl: './cadastro-gerente.component.html'
})
export class CadastroGerenteComponent implements OnInit {

  gerente: Gerente = new Gerente();
  submitted = false;

  constructor(private http: HttpClientService) { }

  ngOnInit() {
  }

  newEmployee(): void {
    this.submitted = false;
    this.gerente = new Gerente();
  }

  save() {
    this.http.createGerente(
      this.gerente)
      .subscribe(value => console.log(value), error => console.log(error));
    this.gerente = new Gerente();
    alert(this.gerente.nome);
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }


  cadastrarGerente(): void {
    this.http.createGerente(this.gerente)
      .subscribe(value  => {
        alert(this.gerente.nome);
      });
  }
}
