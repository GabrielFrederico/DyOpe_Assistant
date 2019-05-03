import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Funcionario, FuncionarioService} from "../service/funcionario.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-cadastro-funcionario',
  templateUrl: './cadastro-funcionario.component.html'
})
export class CadastroFuncionarioComponent implements OnInit {

  ngOnInit() {

  }

  form: any = {};
  public funcionarioInfo: Funcionario;
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private http: FuncionarioService,
              private router: Router, private authService: AuthService) {
  }

  OnSubmit() {
    console.log(this.form);

    this.funcionarioInfo = new Funcionario(
      this.form.nome,
      this.form.nomeUsuario,
      this.form.cpf,
      this.form.rg,
      this.form.email,
      this.form.senhaConfirm,
      this.form.senha);
  this.authService.cadastrarFuncionarioAuth(this.funcionarioInfo).subscribe(
    data => {
      console.log(data);
      this.isSignedUp = true;
      this.isSignUpFailed = false;
      this.router.navigate(['/loginfuncionario']);
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
