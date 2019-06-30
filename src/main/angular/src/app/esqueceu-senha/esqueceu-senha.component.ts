import {Component, OnInit} from '@angular/core';
import {GerenteService} from '../service/gerente.service';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html'
})
export class EsqueceuSenhaComponent implements OnInit {

  constructor(private gerenteService: GerenteService) {
  }

  emailInvalido = false;
  emailenviado = false;
  email: string;
  errorMessage = '';

  ngOnInit() {
  }

  onSubmit() {
    this.gerenteService.enviarEmail(this.email).subscribe(data => {
      if (!this.emailenviado) {
        this.emailenviado = true;
      }
    }, error => {
      this.emailInvalido = false;
      this.emailInvalido = true;
      this.errorMessage = error.error.error;
      if (this.errorMessage === 'Internal Server Error') {
        this.errorMessage = 'Ocorreu um erro no servidor';
      } else {
        this.errorMessage = 'Email inválido!';
      }
      console.log(error.error);
    });

  }
}
