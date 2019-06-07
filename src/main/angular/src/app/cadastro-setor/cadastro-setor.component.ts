import {Component, OnInit} from '@angular/core';
import {CadastroSetorService, Setor} from '../service/cadastro-setor.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';
import {Observable} from 'rxjs';
import {CadastroOperacaoService, EtapaProducao} from '../service/cadastro-operacao.service';
import {GerenteService} from '../service/gerente.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html'
})


export class CadastroSetorComponent implements OnInit {
  setor: Setor = new Setor();
  gerente: any;
  public setores: Observable<Setor[]>;
  public info: any;
  public validado: boolean;
  public etapas: any;
  // tslint:disable-next-line:variable-name
  public etapa_id: number;

  ngOnInit() {
    this.etapaService.getTiposOperacoes().subscribe(data => {
      this.etapas = data;
    });
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.dataReload();
    this.naoAutenticado();

  }

  constructor(private setorService: CadastroSetorService,
              // tslint:disable-next-line:max-line-length
              private router: Router, private etapaService: CadastroOperacaoService, private gerenteService: GerenteService, private setorservice: CadastroSetorService, private token: TokenStorageService) {
  }

  selectEtapa(etapa: number) {
    this.etapa_id = etapa;
  }

  save() {
    this.setor.gerente_id = this.gerente.id;
    this.setor.etapaproducao_id = this.etapa_id;
    this.gerente.setores.push(this.setor);
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
      alert('Setor cadastrado com sucesso!');

    }, error => {
      alert(error);
    });

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
    this.gerenteService.getGerente(this.info.username).subscribe(data => {
      this.gerente = data;
    });
  }
}
