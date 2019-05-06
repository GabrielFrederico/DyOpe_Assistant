import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


// tslint:disable-next-line:class-name
export class loginGerenteInfo {
  nomeUsuario: string;
  senha: string;

  constructor(nomeUsuario: string, senha: string) {
    this.nomeUsuario = nomeUsuario;
    this.senha = senha;
  }
}

// tslint:disable-next-line:class-name
export class Gerente {
  public id: number;
  public nome: string;
  public nomeUsuario: string;
  public cpf: string;
  public rg: string;
  public email: string;
  public senhaConfirm: string;
  public senha: string;
  role: string;

  constructor(nome: string, nomeUsuario: string, cpf: string, rg: string, email: string, senha: string, senhaConfirm: string) {
    this.nome = nome;
    this.nomeUsuario = nomeUsuario;
    this.email = email;
    this.rg = rg;
    this.cpf = cpf;
    this.senha = senha;
    this.role = 'gerente';
    this.senhaConfirm = senhaConfirm;
  }
}

@Injectable({
  providedIn: 'root'
})
export class GerenteService {
  constructor(private httpClient: HttpClient) {
  }

  getGerenteId(id: number): Observable<Gerente> {
    return this.httpClient.get<Gerente>('http://localhost:8080/gerentes/atualizar/' + id);
  }
  atualizarGerenteId(id: number): Observable<Gerente> {
    return this.httpClient.put<Gerente>( 'http://localhost:8080/gerentes/atualizar/' + id, id);

  }

  getGerentes() {
    return this.httpClient.get<Gerente[]>('http://localhost:8080/gerentes');
  }

  getinfoGerentes() {
    return this.httpClient.get<Gerente[]>('http://localhost:8080/gerentes');
  }

  cadastrarGerente(gerente: Gerente): Observable<Gerente> {
    return this.httpClient.post<Gerente>('http://localhost:8080/gerentes/cadastrargerente', gerente);
  }


}
