import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Gerente, GerenteService, loginGerenteInfo} from '../service/gerente.service';
import {Router} from '@angular/router';
import {Observable, of} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';
import {first, map} from 'rxjs/operators';
import {async} from "@angular/core/testing";
import {NgForm} from "@angular/forms";
import {Alert} from "selenium-webdriver";

;

@Component({
  selector: 'app-perfil-gerente',
  templateUrl: './perfil-gerente.component.html',

})
export class PerfilGerenteComponent implements OnInit {
  title: 'Perfil Gerente';
  @ViewChild("inputPassword") senhainput: ElementRef;
  @ViewChild("inputNewPassword") newsenhainput: ElementRef;
  @ViewChild("inputPasswordConfirm") confirmasenhainput: ElementRef;

  // tslint:disable-next-line:max-line-length
  constructor(private modalService: NgbModal, private token: TokenStorageService, private gerenteService: GerenteService, private router: Router) {
  }

  @Input() gerentes: Observable<Gerente[]>;
  @Input() gerente: Gerente;
  public gerenteLogado: boolean;
  public validado: boolean;
  public updateFailed: boolean;
  public errorMessage = '';
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

  focosenhaatual() {
    this.senhainput.nativeElement.focus();
  }

  foconovasenha() {
    this.newsenhainput.nativeElement.focus();
  }

  fococonfirmarsenha() {
    this.confirmasenhainput.nativeElement.focus();
  }

  datareload() {
    this.gerentes = this.gerenteService.getinfoGerentes();

    this.gerentes.forEach((ger) => {
      for (let gerent of ger) {
        if (gerent.nomeUsuario == this.info.username) {
          this.gerente = gerent;
          console.clear();
        }
      }
    })
  }


  onSubmit() {

    this.gerenteService.atualizarGerente(this.gerente)
      .pipe(first())
      .subscribe(
        data => {

          this.isReadonly = true;
          if (this.info.username !== this.gerente.nomeUsuario) {
            alert("Nome de usuário atualizado! Faça o login denovo!");
            this.token.logOut();
            this.router.navigate(['/logingerente']);
          } else {
            alert('Dados atualizados!');
          }

        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.updateFailed = true;
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
