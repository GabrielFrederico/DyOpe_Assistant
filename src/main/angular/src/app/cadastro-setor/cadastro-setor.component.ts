import { Component, OnInit } from '@angular/core';
import {CadastroSetorService, Setor} from '../service/cadastro-setor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html'
})
export class CadastroSetorComponent implements OnInit {
  setor: Setor = new Setor();
  constructor(private setorService: CadastroSetorService,
              private router: Router) { }

  ngOnInit() {
  }
  save() {
    this.setorService.cadastrarSetor(
      this.setor)
      .subscribe(value => console.log(value), error => console.log(error));
    alert('Cadastrado com sucesso!');
  }

}
