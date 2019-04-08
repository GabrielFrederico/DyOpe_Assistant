import { Component, OnInit } from '@angular/core';
import {Gerente, GerenteService} from '../service/gerente.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-gerente',
  templateUrl: './cadastro-gerente.component.html'
})
export class CadastroGerenteComponent implements OnInit {

  gerente: Gerente = new Gerente();
  submitted = false;

  constructor(private http: GerenteService,
              private router: Router) { }

  ngOnInit() {
  }

  newGerente(): void {
    this.submitted = false;
    this.gerente = new Gerente();
  }

  save() {
    this.http.addGerente(
      this.gerente)
      .subscribe(value => console.log(value), error => console.log(error));
    this.router.navigate(['/logingerente']);
    alert('Cadastrado com sucesso!');
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }


}
