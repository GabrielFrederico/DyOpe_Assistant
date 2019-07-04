import {Component, OnInit, ChangeDetectorRef} from '@angular/core';

import {CadastroOperacaoService} from '../service/cadastro-operacao.service';
import {CadastroSetorService} from '../service/cadastro-setor.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {GerenteService} from '../service/gerente.service';
import {first} from 'rxjs/operators';
import {isUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  preserveWhitespaces: false
})
export class SidebarComponent implements OnInit {
  public isCollapsed = false;
  etapas: any;
  gerente: any;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private gerenteService: GerenteService, private changeDetectorRefs: ChangeDetectorRef ,private tipoOpeservice: CadastroOperacaoService, private token: TokenStorageService, private setorservice: CadastroSetorService) {
  }

  public info: any;
  gerenteobj: any;
  etapasOpen = false;
  informacoes() {
    if(this.etapasOpen){
      this.gerenteService.getGerente(this.info.username).subscribe(data => {
        this.gerenteobj = data;
        if (this.gerente.etapas.length < this.gerenteobj.etapas.length || isUndefined(this.gerente.etapas)) {
          this.gerente = this.gerenteobj;
        }
      }, error => {
        console.log(error.error);
      });
    }

  }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities(),
      senha: this.token.getPassword()
    };
    this.tipoOpeservice.getEtapasProducao().subscribe(data => {
      this.etapas = data;
        this.gerenteService.getGerente(this.info.username).subscribe(gerente => {
          this.gerente = gerente;
          if (this.gerente.etapas.length <= 0) {
            this.etapas.forEach((item, index) => {
              item.id = null;
              item.predefinidas = 0;
              item.gerente_id = this.gerente.id;
              this.gerente.etapas.push(item);
            });
            this.gerenteService.cadastrarAlgo(this.gerente).pipe(first()).subscribe(ger => {
             // this.gerenteobj = data;
            }, error => {
              console.log(error.error);
            });
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
            this.router.navigate(['/gerenteindex/homegerente']));

          }
        });
        this.etapasOpen = true;

    });
    console.clear();
  }


}
