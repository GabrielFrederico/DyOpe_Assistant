import {Component, OnInit} from '@angular/core';
import {CadastroSetorService} from '../service/cadastro-setor.service';
import {Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';
import {CadastroOperacaoService} from '../service/cadastro-operacao.service';
import {GerenteService} from '../service/gerente.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-setor',
  templateUrl: './cadastro-setor.component.html'
})


export class CadastroSetorComponent implements OnInit {

  etapa: any = {};
  gerente: any;
  public info: any;
  public validado: boolean;
  public etapas: any;

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


  save() {
    this.etapa.gerente_id = this.gerente.id;
    this.gerente.etapas.push(this.etapa);
    this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(data => {
      alert('Etapa cadastrada com sucesso!');
      this.router.navigateByUrl('/gerenteindex/homegerente', {skipLocationChange: true}).then(() =>
        this.router.navigate(['/gerenteindex/cadastrosetor']));
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
