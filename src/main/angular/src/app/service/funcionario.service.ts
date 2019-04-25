import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';



export class Funcionario {
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

  cadastrarFuncionario(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>('http://localhost:8080/funcionarios/cadastrarfuncionario', funcionario);
  }

}
