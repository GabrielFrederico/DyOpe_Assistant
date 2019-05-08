import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Gerente, GerenteService, loginGerenteInfo} from '../service/gerente.service';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';
import {first, map} from 'rxjs/operators';
import {async} from "@angular/core/testing";
import {NgForm} from "@angular/forms";

;

@Component({
  selector: 'app-perfil-gerente',
  templateUrl: './perfil-gerente.component.html',

})
export class PerfilGerenteComponent implements OnInit {
  title:'Perfil Gerente';
  // tslint:disable-next-line:max-line-length
  constructor(private modalService: NgbModal, private token: TokenStorageService, private gerenteService: GerenteService, private router: Router) {
  }

  @Input() gerentes: Observable<Gerente[]>;
  @Input() gerente: Gerente;
  public gerenteLogado: boolean;
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

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.naoAutenticado();
    this.datareload();
  }

  datareload() {
    this.gerentes = this.gerenteService.getinfoGerentes();

    this.gerentes.forEach((ger)=>{
      for (let gerent of ger){
        if (gerent.nomeUsuario == this.info.username){
          this.gerenteLogado = true;
          this.gerente = gerent;
        }
      }
    })
  }


  onSubmit(nome: HTMLInputElement,nomeUsuario: HTMLInputElement,cpf: HTMLInputElement,rg: HTMLInputElement,email: HTMLInputElement) {

    this.gerente.nome = nome.value;
    this.gerente.nomeUsuario = nomeUsuario.value;
    this.gerente.rg = rg.value;
    this.gerente.email = email.value;
    this.gerente.cpf = cpf.value;
    this.gerenteService.atualizarGerente(this.gerente)
      .pipe(first())
      .subscribe(
        data => {
          alert('Dados atualizados!');
          this.isReadonly = true;
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
