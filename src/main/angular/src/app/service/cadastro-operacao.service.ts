import { Injectable } from '@angular/core';
import { Gerente } from "./gerente.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

export class EtapaProducao{
  public idTipoOpe: number;
  public tipoOpe: string;
  public statusSYS: 'A';
  public gerente_id: number;
  public operacoes: Operacao[];

}
export class Operacao {
  public id: number;
  public precoPecaOpe: any;
  public custosOpe: any;
  public descricao: string;
  public dataInicio: Date;
  public prazo: Date;
  public loteProducao: number;
  public qtdPecasOpe: number;
  public tempoNesc: number;
  public numFuncionariosOpe: number;
  public id_tipo_ope: number;
  public statusSYS: true;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class CadastroOperacaoService {

  constructor(private httpClient: HttpClient) {
  }
  getOperacoes() {
    return this.httpClient.get<Operacao[]>('http://localhost:8080/gerentes/operacoes', httpOptions);
  }
  getEtapaProducao(id: number): Observable<EtapaProducao>{
    return this.httpClient.get<EtapaProducao>('http://localhost:8080/tipoOpe/'+id, httpOptions);
  }
  getTiposOperacoes() {
    return this.httpClient.get<EtapaProducao[]>('http://localhost:8080/tipoOpe', httpOptions);
  }
  cadastrarOperacao(operacao: Operacao) {
    return this.httpClient.post<Operacao>('http://localhost:8080/gerentes/cadastraroperacao', operacao, httpOptions);
  }
}
