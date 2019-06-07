import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {CadastroSetorService, Setor} from '../service/cadastro-setor.service';
import {Infosetor, InfosetorService} from '../service/infosetor.service';

@Component({
  selector: 'app-controle-funcionarios',
  templateUrl: './controle-funcionarios.component.html',
  preserveWhitespaces: false
})
export class ControleFuncionariosComponent implements OnInit, OnDestroy {

  infosetor: Observable<Infosetor[]>;
  public info: any;
  public validado: boolean;
  public setor: Setor;
  sub: Subscription;

  constructor(private modalService: NgbModal, private setorservice: CadastroSetorService, private route: ActivatedRoute, private token: TokenStorageService, private router: Router, private infosetorService: InfosetorService) {
  }

  ngOnInit() {
    this.naoAutenticado();
    this.setorEscolhido();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
    this.sub = this.route.params['nomeSetor'].subscribe(params => {
      const nomeSetor = params['nomeSetor'];
      if (nomeSetor) {
        this.setorservice.getSetorNome(nomeSetor).subscribe((setor: Setor) => {
          if (setor) {
            this.setor = setor;
            console.clear();
          }
        })
      }
    })

  }

}
