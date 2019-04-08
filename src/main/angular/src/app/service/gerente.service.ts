import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class Gerente {
  public nome: string;
  public nomeUsuario: string;
  public cpf: string;
  public rg: string;
  public email: string;
  public senhaConfirm: string;
  public senha: string;

}

@Injectable({
  providedIn: 'root'
})
export class GerenteService {
constructor(private httpClient: HttpClient) {
  }

  baseUrl = 'http://localhost:8080/gerentes/cadastrargerente';
  getGerentes() {
    return this.httpClient.get<Gerente[]>('http://localhost:8080/gerentes');
  }

  addGerente(gerente: Gerente): Observable<Gerente> {
    return this.httpClient.post<Gerente>(`${this.baseUrl}`, gerente);
  }

  createGerente(gerente: Gerente): Observable<Gerente> {
    return this.httpClient.post<Gerente>(`http://localhost:8080/gerentes/cadastrargerente`, gerente);
  }
}
