import { Component, OnInit } from '@angular/core';
import {Funcionario} from '../service/funcionario.service';
import {FuncionarioService} from '../service/funcionario.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html'
})
export class CadastroFuncionarioComponent implements OnInit {

  funcionario: Funcionario = new Funcionario();

  constructor(private http: FuncionarioService,
              private router: Router) { }

  ngOnInit() {
  }

  save() {
    this.http.cadastrarFuncionario(
      this.funcionario)
      .subscribe(value => console.log(value), error => console.log(error));
    this.router.navigate(['/loginfuncionario']);
    alert('Cadastrado com sucesso!');
  }

}
