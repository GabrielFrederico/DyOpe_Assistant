import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export class Gerente {
 constructor(
   public nome: string,
   public nomeUsuario: string,
   public cpf: string,
   public rg: string,
   public email: string,
   public senhaConfirm: string,
   public senha: string,


 ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) {
  }

  getGerentes() {
    return this.httpClient.get<Gerente[]>('http://localhost:8080/gerentes');
  }
  cadastrarGerente(gerente) {
    return this.httpClient.post<Gerente>('http://localhost:8080/gerentes/cadastrargerente', gerente);

  }
}
