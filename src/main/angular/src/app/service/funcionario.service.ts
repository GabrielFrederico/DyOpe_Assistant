import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class loginFuncionarioInfo {
  nomeUsuario: string;
  senha: string;

  constructor(nomeUsuario: string, senha: string) {
    this.nomeUsuario = nomeUsuario;
    this.senha = senha;
  }
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Funcionario {
  public id:number;
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
    this.role = 'funcionario';
    this.senhaConfirm = senhaConfirm;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor(private httpClient: HttpClient) { }

  getFuncionarios() {
    return this.httpClient.get<Funcionario[]>('http://localhost:8080/funcionarios');
  }

  getFuncionarioLogado(nomeUsuario: string): Observable<Funcionario>{
    return this.httpClient.get<Funcionario>('http://localhost:8080/funcionarios/getByNomeUsuario/'+ nomeUsuario, httpOptions);
  }
  atualizarFuncionario(funcionario:Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>( 'http://localhost:8080/funcionarios/atualizar',funcionario);

  }
  cadastrarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>('http://localhost:8080/funcionarios/cadastrarfuncionario', funcionario);
  }

}
