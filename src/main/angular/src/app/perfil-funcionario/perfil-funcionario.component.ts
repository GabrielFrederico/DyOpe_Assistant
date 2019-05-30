import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {InfosetorService} from "../service/infosetor.service";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TokenStorageService} from "../auth/token-storage.service";
import {Funcionario, FuncionarioService} from "../service/funcionario.service";
import {Observable} from "rxjs";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-perfil-funcionario',
  templateUrl: './perfil-funcionario.component.html'
})
export class PerfilFuncionarioComponent implements OnInit {
  @Input() funcionarios: Observable<Funcionario[]>;
  @Input() funcionarioObjeto: Observable<Funcionario>;
  @Input() funcionario: Funcionario;
  info: any;
  form: any = {};
  public isCollapsed = false;
  public funcionarioLogado: boolean;
  public updateFailed: boolean;

  closeResult: string;
  private roles: string[];
  private authority: string;
  public errorMessage = '';
  @ViewChild("inputPassword") senhainput: ElementRef;
  @ViewChild("inputNewPassword") newsenhainput: ElementRef;
  @ViewChild("inputPasswordConfirm") confirmasenhainput: ElementRef;
  @ViewChild("cpf") cpf: ElementRef;
  @ViewChild("rg") rg: ElementRef;

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.naoAutenticado();
    this.datareload();
    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_GERENTE') {
          this.authority = 'gerente';
          return true;
        } else if (role === 'ROLE_FUNCIONARIO') {
          this.authority = 'funcionario';
          return true;
        }
      });
    }
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

  constructor(private http: InfosetorService,
              private router: Router, private funcionarioService: FuncionarioService, private modalService: NgbModal, private token: TokenStorageService) {
  }

  datareload() {
    this.funcionarioObjeto = this.funcionarioService.getFuncionarioLogado(this.info.username);
    this.funcionarioObjeto.subscribe(data => {
      this.funcionario = data;
      console.clear();
    })
  }

  private validado: boolean;

  naoAutenticado() {
    if (this.info.authorities.toString() !== 'ROLE_FUNCIONARIO') {
      this.validado = false;
      this.router.navigate(['/loginfuncionario']);
      alert('Acesso Negado! Faça o Login!');

    } else {
      this.validado = true;
    }
  }

  isReadonly = true;
  senhaerrada = false;
  redefinirSenha() {
    if (this.newsenhainput.nativeElement.value == this.confirmasenhainput.nativeElement.value) {
      this.funcionario.senha = this.newsenhainput.nativeElement.value;
      this.funcionarioService.atualizarFuncionario(this.funcionario)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/loginfuncionario']);
            this.token.logOut();
            alert("Senha atualizada! Faça o login denovo!");
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
    if (this.newsenhainput.nativeElement.value == this.confirmasenhainput.nativeElement.value) {
      this.funcionario.senha = this.newsenhainput.nativeElement.value;
      this.funcionarioService.atualizarFuncionario(this.funcionario)
        .pipe(first())
        .subscribe(
          data => {
            this.isReadonly = true;
            if (this.info.username !== this.funcionario.nomeUsuario) {
              alert("Nome de usuário atualizado! Faça o login denovo!");
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
