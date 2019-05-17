import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Gerente, GerenteService} from '../service/gerente.service';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-cadastro-gerente',
  templateUrl: './cadastro-gerente.component.html'
})
export class CadastroGerenteComponent implements OnInit {
  form: any = {};
  public gerenteInfo: Gerente;
  isSignedUp = false;
  isSignUpFailed = false;
  senhaerrada = false;
  errorMessage = '';
  @ViewChild("inputPassword") senhainput: ElementRef;
  @ViewChild("inputPasswordConfirm") confirmasenhainput: ElementRef;

  constructor(private http: GerenteService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  focosenha() {
    this.senhainput.nativeElement.focus();
  }

  fococonfirmarsenha() {
    this.confirmasenhainput.nativeElement.focus();
  }

  OnSubmit(cpf: string) {
    this.form.cpf = cpf;
    console.log(this.form);

    this.gerenteInfo = new Gerente(
      this.form.nome,
      this.form.nomeUsuario,
      this.form.cpf,
      this.form.rg,
      this.form.email,
      this.form.senhaConfirm,
      this.form.senha);

    if (this.gerenteInfo.senha !== this.gerenteInfo.senhaConfirm) {
      this.senhaerrada = true;
    } else {
      this.authService.cadastrarGerenteAuth(this.gerenteInfo).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/logingerente']);
          alert('Cadastrado com sucesso!');
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      );
    }
  }
}
