import { Component, OnInit, Inject} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {Route, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {CadastroSetorService, Setor} from '../service/cadastro-setor.service';
import {Infosetor, InfosetorService} from '../service/infosetor.service';

@Component({
  selector: 'app-controle-funcionarios',
  templateUrl: './controle-funcionarios.component.html'
})
export class ControleFuncionariosComponent implements OnInit {

  infosetor: Observable<Infosetor[]>;
  public setores: Observable<Setor[]>;
  public info: any;
  private validado: boolean;

  constructor(private modalService: NgbModal, private setorservice: CadastroSetorService, private token: TokenStorageService, private router: Router, private infosetorService: InfosetorService) {}

  ngOnInit() {
    this.infosetorService.getInfosetor()
      .subscribe( data => {
      });
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.naoAutenticado();
    this.dataReload();
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
    dataReload() {
      this.infosetor = this.infosetorService.getInfosetor();
      this.setores = this.setorservice.getSetor();
    }
}
