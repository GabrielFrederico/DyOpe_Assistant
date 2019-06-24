import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';
import {GerenteService} from '../service/gerente.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html'
})
export class RedefinirSenhaComponent implements OnInit {

  constructor(private usuarioService: GerenteService, private  router: Router) {
  }

  @ViewChild('inputNewPassword') newsenhainput: ElementRef;
  @ViewChild('inputPasswordConfirm') confirmasenhainput: ElementRef;

  senhaerrada = false;
  usuario: any;
  updateFailed = false;
  errorMessage = '';

  ngOnInit() {
  }

  foconewsenha() {
    this.newsenhainput.nativeElement.focus();
  }

  fococonfirmarsenha() {
    this.confirmasenhainput.nativeElement.focus();
  }

  redefinirSenha() {
    if (this.newsenhainput.nativeElement.value === this.confirmasenhainput.nativeElement.value) {
      this.usuario.senha = this.newsenhainput.nativeElement.value;
      this.usuarioService.atualizarSenhaGerente(this.usuario)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate(['/']);
            // this.token.logOut();
            alert('Senha atualizada! Faça o login!');
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

}
