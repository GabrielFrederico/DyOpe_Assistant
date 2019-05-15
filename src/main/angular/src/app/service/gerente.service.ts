import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from "../auth/token-storage.service";
import {Operacao} from "./cadastro-operacao.service";


// tslint:disable-next-line:class-name
export class loginGerenteInfo {
  nomeUsuario: string;
  senha: string;

  constructor(nomeUsuario: string, senha: string) {
    this.nomeUsuario = nomeUsuario;
    this.senha = senha;
  }
}
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
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
  public operacoes: Observable<Operacao[]>;

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
  public info: any;
  public gerentes : Observable<Gerente[]>;
  public gerente: Observable<Gerente>;
  public gerent:Gerente;
  constructor(private httpClient: HttpClient,private token: TokenStorageService) {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

  }

  datareload(){
    this.gerentes = this.getinfoGerentes();

    this.gerentes.forEach((ger) => {
      for (let gerent of ger) {
        if (gerent.nomeUsuario == this.info.username) {
           this.gerente = this.getGerenteId(gerent.id);

          this.gerente.subscribe((data: Gerente)=>{
           this.gerent = data;
          })
          console.clear();
        }
      }
    });
    return this.gerent;
  }

  getGerenteId(id: number): Observable<Gerente> {
    return this.httpClient.get<Gerente>('http://localhost:8080/gerentes/gerente/' + id, httpOptions);
  }

  atualizarGerente(gerente: Gerente): Observable<Gerente> {
    return this.httpClient.put<Gerente>( 'http://localhost:8080/gerentes/atualizar',gerente);

  }
getOperacoes(){
    return this.httpClient.get<Operacao[]>('http://localhost:8080/operacoes/operacoes');
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
