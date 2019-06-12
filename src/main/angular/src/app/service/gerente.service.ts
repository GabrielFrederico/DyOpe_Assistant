import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Operacao} from './cadastro-operacao.service';
import {Setor} from './cadastro-setor.service';


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
  public chaveAcesso: string;
  role: string;
  public operacoes: Operacao[];
  public operacoesFazer: Operacao[];
  public operacoesAndamento: Operacao[];
  public operacoesPrazo: Operacao[];
  public setores: Setor[];
  public pecas: Peca[];

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

export class Peca {
  public id: number;
  public descricao: string;
  public operacoes: Operacao[];
  // tslint:disable-next-line:variable-name
  public gerente_id: number;
  // tslint:disable-next-line:variable-name
  public etapa_producao_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class GerenteService {
  constructor(private httpClient: HttpClient) {
  }


  getGerenteId(id: number): Observable<Gerente> {
    return this.httpClient.get<Gerente>('http://localhost:8080/gerentes/gerente/' + id, httpOptions);
  }

  atualizarSenhaGerente(gerente: any) {
    return this.httpClient.put('http://localhost:8080/gerentes/atualizarsenha', gerente);
  }

  atualizarGerente(gerente: Gerente): Observable<Gerente> {
    return this.httpClient.put<Gerente>('http://localhost:8080/gerentes/atualizargerente', gerente);
  }

  cadastrarAlgo(gerente: any) {
    return this.httpClient.put('http://localhost:8080/gerentes/cadastraralgo', gerente);
  }

  getPecaNome(nome: string) {
    return this.httpClient.get('http://localhost:8080/pecas/getByNome/' + nome);
  }

  getGerenteLogado(nomeUsuario: string): Observable<Gerente> {

    return this.httpClient.get<Gerente>('http://localhost:8080/gerentes/getByNomeUsuario/' + nomeUsuario, httpOptions);
  }

  atualizarPeca(peca: any) {
    return this.httpClient.put('http://localhost:8080/pecas', peca);
  }

  getGerente(nomeUsuario: string) {
    return this.httpClient.get('http://localhost:8080/gerentes/getByNomeUsuario/' + nomeUsuario);
  }

  chaveAcesso(gerente: any) {
    return this.httpClient.put('http://localhost:8080/gerentes/chaveAcesso', gerente);
  }

  getGerentes() {
    return this.httpClient.get<Gerente[]>('http://localhost:8080/gerentes');
  }
  cadastrarGerente(gerente: Gerente): Observable<Gerente> {
    return this.httpClient.post<Gerente>('http://localhost:8080/gerentes/cadastrargerente', gerente);
  }


}
