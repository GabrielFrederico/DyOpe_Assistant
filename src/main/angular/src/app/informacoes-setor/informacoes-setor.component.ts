import {Component, OnInit} from '@angular/core';
import {Infosetor, InfosetorService} from '../service/infosetor.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-informacoes-setor',
  templateUrl: './informacoes-setor.component.html'
})
export class InformacoesSetorComponent implements OnInit {

  constructor(private http: InfosetorService,
              private router: Router, private modalService: NgbModal, private token: TokenStorageService) {
  }

  info: any;
  form: any = {};
  public isCollapsed = false;

  closeResult: string;
  private roles: string[];
  private authority: string;

  infosetor: Infosetor = new Infosetor();

  public validado: boolean;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.naoAutenticado();
  }

  logout() {
    this.token.logOut();
    window.location.reload();
  }

  save() {
    this.http.cadastrarInfosetor(
      this.infosetor)
      .subscribe(value => console.log(value), error => console.log(error));
    this.router.navigate(['/funcionarioindex']);
    alert('Cadastrado com sucesso!');
  }
  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_FUNCIONARIO') {
      this.validado = false;
      this.router.navigate(['/loginfuncionario']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }

}
