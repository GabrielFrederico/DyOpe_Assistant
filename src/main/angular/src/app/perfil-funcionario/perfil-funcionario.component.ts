import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {InfosetorService} from '../service/infosetor.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from '../auth/token-storage.service';
import {FuncionarioService} from '../service/funcionario.service';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-perfil-funcionario',
  templateUrl: './perfil-funcionario.component.html'
})
export class PerfilFuncionarioComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private http: InfosetorService,
              // tslint:disable-next-line:max-line-length
              private router: Router, private funcionarioService: FuncionarioService, private modalService: NgbModal, private token: TokenStorageService) {
  }

  funcionario: any;
  info: any;
  form: any = {};
  public isCollapsed = false;
  public funcionarioLogado: boolean;
  public updateFailed: boolean;

  sub: Subscription;

  closeResult: string;
  private roles: string[];
  private authority: string;
  public errorMessage = '';
  @ViewChild('inputPassword') senhainput: ElementRef;
  @ViewChild('inputNewPassword') newsenhainput: ElementRef;
  @ViewChild('inputPasswordConfirm') confirmasenhainput: ElementRef;
  @ViewChild('cpf') cpf: ElementRef;
  @ViewChild('rg') rg: ElementRef;

  private validado: boolean;

  isReadonly = true;
  senhaerrada = false;


  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.naoAutenticado();
    this.datareload();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();

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
    this.funcionarioService.getFuncionarioLogado(this.info.username).subscribe(data => {
      this.funcionario = data;
    });
    console.clear();
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

  redefinirSenha() {
    if (this.newsenhainput.nativeElement.value === this.confirmasenhainput.nativeElement.value) {
      this.funcionario.senha = this.newsenhainput.nativeElement.value;
      this.funcionarioService.atualizarSenhaFuncionario(this.funcionario)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/loginfuncionario']);
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

    this.funcionario.cpf = cpf;
    this.funcionario.rg = rg;
    if (this.newsenhainput.nativeElement.value === this.confirmasenhainput.nativeElement.value) {
      this.funcionario.senha = this.newsenhainput.nativeElement.value;
      this.funcionarioService.atualizarFuncionario(this.funcionario)
        .pipe(first())
        .subscribe(
          data => {
            this.isReadonly = true;
            if (this.info.username !== this.funcionario.nomeUsuario) {
              alert('Nome de usuário atualizado! Faça o login denovo!');
              this.token.logOut();
              this.router.navigate(['/loginfuncionario']);
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
  }

  toggleReadonly() {
    this.isReadonly = !this.isReadonly;
  }
}
