import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CadastroSetorService} from '../service/cadastro-setor.service';
import {InfosetorService} from '../service/infosetor.service';
import {GerenteService} from '../service/gerente.service';
import {FuncionarioService} from '../service/funcionario.service';
import {CadastroOperacaoService} from '../service/cadastro-operacao.service';

@Component({
  selector: 'app-controle-funcionarios',
  templateUrl: './controle-funcionarios.component.html',
  preserveWhitespaces: false
})
export class ControleFuncionariosComponent implements OnInit, OnDestroy {

  // tslint:disable-next-line:max-line-length
  constructor(private gerenteService: GerenteService, private etapasService: CadastroOperacaoService,
              private funcionarioService: FuncionarioService,
              private modalService: NgbModal, private setorservice: CadastroSetorService,
              private route: ActivatedRoute, private token: TokenStorageService, private router: Router,
              private infosetorService: InfosetorService) {
  }

  public info: any;
  public validado: boolean;
  public setor: any;
  sub: Subscription;

  funcionario: any;

  infosetor: any;

  etapa: any;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.naoAutenticado();
    this.setorEscolhido();

  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
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

  setorEscolhido() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.etapasService.getEtapaId(id).subscribe(data => {
          this.etapa = data;
        }, error => {
          console.log(error.error);
        });
      }
    });

  }

}
