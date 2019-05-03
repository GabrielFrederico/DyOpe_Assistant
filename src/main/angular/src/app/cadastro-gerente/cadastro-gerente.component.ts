import {Component, OnInit} from '@angular/core';
import {Gerente, GerenteService} from '../service/gerente.service';
import {Router} from '@angular/router';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-cadastro-gerente',
  templateUrl: './cadastro-gerente.component.html'
})
export class CadastroGerenteComponent implements OnInit {
  form: any = {};
  public gerenteInfo: Gerente;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private http: GerenteService,
              private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  OnSubmit() {
    console.log(this.form);

    this.gerenteInfo = new Gerente(
      this.form.nome,
      this.form.nomeUsuario,
      this.form.cpf,
      this.form.rg,
      this.form.email,
      this.form.senhaConfirm,
      this.form.senha);

    this.authService.cadastrarGerenteAuth(this.gerenteInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/logingerente']);
        alert("Cadastrado com sucesso!");
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );


  }
}
