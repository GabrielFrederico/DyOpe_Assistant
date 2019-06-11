import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GerenteService} from '../service/gerente.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-perfil-gerente',
  templateUrl: './perfil-gerente.component.html',
  preserveWhitespaces: false

})
export class PerfilGerenteComponent implements OnInit {
  title: 'Perfil Gerente';
  @ViewChild('inputPassword') senhainput: ElementRef;
  @ViewChild('inputNewPassword') newsenhainput: ElementRef;
  @ViewChild('inputPasswordConfirm') confirmasenhainput: ElementRef;
  @ViewChild('cpf') cpf: ElementRef;
  @ViewChild('rg') rg: ElementRef;

  // tslint:disable-next-line:max-line-length
  constructor(private modalService: NgbModal, private token: TokenStorageService, private gerenteService: GerenteService, private router: Router) {
  }

  gerente: any;
  public gerenteLogado: boolean;
  public validado: boolean;
  public senhaerrada: boolean;
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
    this.gerenteService.getGerente(this.info.username).subscribe(data => {
      this.gerente = data;
    });
    this.datareload();
    this.naoAutenticado();

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

    console.clear();

  }

  redefinirSenha() {
    if (this.newsenhainput.nativeElement.value === this.confirmasenhainput.nativeElement.value) {
      this.gerente.senha = this.newsenhainput.nativeElement.value;
      this.gerenteService.atualizarSenhaGerente(this.gerente)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/logingerente']);
            this.token.logOut();
            alert('Senha atualizada! Faça o login denovo!');
          },
          error => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.updateFailed = true;
          });
    } else {
      this.senhaerrada = true;

    }
  }

  onSubmit(cpf, rg: string) {

    this.gerente.cpf = cpf;
    this.gerente.rg = rg;
    this.gerenteService.cadastrarAlgo(this.gerente)
      .pipe(first())
      .subscribe(
        data => {

          this.isReadonly = true;
          if (this.info.username !== this.gerente.nomeUsuario) {
            alert('Nome de usuário atualizado! Faça o login denovo!');
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

  cadastrarChaveAcesso() {
    this.gerenteService.chaveAcesso(
      this.gerente)
      .pipe(first())
      .subscribe(
        data => {
          alert('Chave de acesso cadastrada!');
        }, error => {
          console.log(error.error);
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
