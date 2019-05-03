import {Component, OnInit} from '@angular/core';
import {CadastroSetorService, Setor} from '../service/cadastro-setor.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html'
})



export class CadastroSetorComponent implements OnInit {
  setor: Setor = new Setor();
  public setores: Observable<Setor[]>;
  public info: any;
  public validado: boolean;
  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.naoAutenticado();
    this.dataReload();
  }
  constructor(private setorService: CadastroSetorService,
              private router: Router,private setorservice: CadastroSetorService, private token: TokenStorageService) {
  }


  save() {
    this.setorService.cadastrarSetor(
      this.setor)
      .subscribe(value => console.log(value), error => console.log(error));
    alert('Cadastrado com sucesso!');
  }

  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_GERENTE') {
      this.validado = false;
      this.router.navigate(['/logingerente']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }
  dataReload(){
    this.setores = this.setorservice.getSetor();
  }
}
