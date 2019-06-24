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

  getGerenteLogado(nomeUsuario: string): Observable<Gerente> {

    return this.httpClient.get<Gerente>('http://localhost:8080/gerentes/getByNomeUsuario/' + nomeUsuario, httpOptions);
  }


  getGerente(nomeUsuario: string) {
    return this.httpClient.get('http://localhost:8080/gerentes/getByNomeUsuario/' + nomeUsuario);
  }

  enviarEmail(email: string) {
    return this.httpClient.post('http://localhost:8080/usuarios/enviaremailsenha', email);
  }

  cadastrarAlgo(gerente: any) {
    return this.httpClient.put('http://localhost:8080/gerentes/cadastraralgo', gerente);
  }

  cadastrarOperacao(gerente: any) {
    return this.httpClient.put('http://localhost:8080/gerentes/cadastrarope', gerente);
  }


  chaveAcesso(gerente: any) {
    return this.httpClient.put('http://localhost:8080/gerentes/chaveAcesso', gerente);
  }

  getGerentes() {
    return this.httpClient.get<Gerente[]>('http://localhost:8080/gerentes');
  }

  acessarPlanilha(gerente: any) {
    return this.httpClient.post('http://localhost:8080/gerentes/acessarplanilha', gerente);

  }

  getPecaNome(nome: string) {
    return this.httpClient.get('http://localhost:8080/pecas/getByNome/' + nome);
  }

  getPecaId(id: number) {
    return this.httpClient.get('http://localhost:8080/pecas/' + id);

  }

  // peça
  atualizarPeca(peca: any) {
    return this.httpClient.put('http://localhost:8080/pecas', peca);
  }

  pecaOpesFazer(peca: any) {
    return this.httpClient.put('http://localhost:8080/pecas/operacaoFazer', peca);
  }

  pecaOpesAndamento(peca: any) {
    return this.httpClient.put('http://localhost:8080/pecas/operacaoAndamento', peca);
  }

  // planilha

  cadastrarPlanilha(gerente: any) {
    return this.httpClient.put('http://localhost:8080/gerentes/cadastrarplanilha', gerente);
  }

  atualizarPlanilha(planilha: any) {
    return this.httpClient.put('http://localhost:8080/planilhascusto', planilha);
  }

  getPlanilhaId(id: number) {
    return this.httpClient.get('http://localhost:8080/planilhascusto/' + id);

  }

}
