import {Component, OnInit} from '@angular/core';
import {GerenteService} from '../service/gerente.service';

@Component({
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html'
})
export class EsqueceuSenhaComponent implements OnInit {
  emailInvalido = false;
  emailenviado = false;
  email: string;

  constructor(private gerenteService: GerenteService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.gerenteService.enviarEmail(this.email).subscribe(data => {
      this.emailenviado = true;
    }, error => {
      this.emailInvalido = true;
      console.log(error.error);
    });

  }
}
