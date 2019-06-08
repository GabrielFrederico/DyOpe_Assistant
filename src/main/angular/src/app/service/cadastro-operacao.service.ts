import {Injectable} from '@angular/core';
import {Gerente} from './gerente.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class EtapaProducao {
  public id: number;
  public etapaProducao: string;
  public statusSYS: 'A';
  // tslint:disable-next-line:variable-name
  public gerente_id: number;
  public operacoes: Operacao[];

}

export class Operacao {
  public id: number;
  public precoPecaOpe: any;
  public custosOpe: any;
  public suboperacoes: SubOperacao[];
  public dataInicio: Date;
  public prazo: Date;
  public loteProducao: number;
  public qtdPecasOpe: number;
  public numFuncionariosDisponiveis: number;
  // tslint:disable-next-line:variable-name
  public etapa_producao_id: number;
  // tslint:disable-next-line:variable-name
  public gerente_id: number;
  // tslint:disable-next-line:variable-name
  public peca_id: number;
  public statusSYS: true;
}

export class SubOperacao {
  public id: number;
  public descricao: string;
  public tempoNesc: string;
  public numFuncionarios: string;
  // tslint:disable-next-line:variable-name
  public operacao_id: number;
}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
};

@Injectable({
  providedIn: 'root'
})
export class CadastroOperacaoService {

  constructor(private httpClient: HttpClient) {
  }

  getSubOperacoes() {
    return this.httpClient.get('http://localhost:8080/suboperacoes');
  }

  getOperacao(operacao: any) {
    return this.httpClient.get('http://localhost:8080/operacoes', operacao);
  }

  getOperacoes() {
    return this.httpClient.get<Operacao[]>('http://localhost:8080/operacoes', httpOptions);
  }

  updateOperacao(operacao: any) {
    return this.httpClient.put('http://localhost:8080/operacoes', operacao);

  }

  updateSubOperacao(operacao: SubOperacao) {
    return this.httpClient.put<SubOperacao>('http://localhost:8080/operacoes', operacao);

  }

  getOperacaoId(id: number): Observable<Operacao> {
    return this.httpClient.get<Operacao>('http://localhost:8080/operacoes/' + id, httpOptions);
  }

  getEtapaProducao(id: number): Observable<EtapaProducao> {
    return this.httpClient.get<EtapaProducao>('http://localhost:8080/etapaProducao/' + id, httpOptions);
  }

  getEtapaProducaoNome(etapa: string) {
    return this.httpClient.get('http://localhost:8080/etapaProducao/getByNome/' + etapa);
  }

  getTiposOperacoes() {
    return this.httpClient.get('http://localhost:8080/etapaProducao');
  }

  cadastrarOperacao(operacao: Gerente) {
    return this.httpClient.post<Gerente>('http://localhost:8080/gerentes/atualizargerente', operacao, httpOptions);
  }
}
