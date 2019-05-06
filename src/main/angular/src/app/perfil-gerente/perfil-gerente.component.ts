import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Gerente, GerenteService, loginGerenteInfo} from '../service/gerente.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';
import {first, map} from 'rxjs/operators';
import {subscribeToArray} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-perfil-gerente',
  templateUrl: './perfil-gerente.component.html'
})
export class PerfilGerenteComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  constructor(private modalService: NgbModal, private token: TokenStorageService, private gerenteService: GerenteService, private router: Router) {
  }

  @Input() gerentes: Observable<Gerente[]>;
  gerente: Gerente;
  public validado: boolean;

  public info: any;
  form: any = {};
  public isCollapsed = false;
  closeResult: string;

  isReadonly = true;

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openLogout(content) {
    this.modalService.open(content, {size: 'sm', ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${PerfilGerenteComponent.getDismissReason(reason)}`;
    });
  }

  ngOnInit() {

    this.datareload();
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.naoAutenticado();
  }

  datareload() {
    this.gerentes = this.gerenteService.getinfoGerentes();
  }
onSubmit() {
  this.gerenteService.atualizarGerenteId(1)
    .pipe(first())
    .subscribe(
      data => {
          alert('Dados atualizados.');
      },
      error => {
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

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }
}
