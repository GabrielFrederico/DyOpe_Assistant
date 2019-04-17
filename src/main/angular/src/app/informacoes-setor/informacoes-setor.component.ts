import {Component, OnInit} from '@angular/core';
import {Infosetor, InfosetorService} from '../service/infosetor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-informacoes-setor',
  templateUrl: './informacoes-setor.component.html'
})
export class InformacoesSetorComponent implements OnInit {

  infosetor: Infosetor = new Infosetor();

  constructor(private http: InfosetorService,
              private router: Router) {
  }

  ngOnInit() {
  }

  save() {
    this.http.cadastrarInfosetor(
      this.infosetor)
      .subscribe(value => console.log(value), error => console.log(error));
    this.router.navigate(['/controlefuncionarios']);
    alert('Cadastrado com sucesso!');
  }

}
