import {Injectable} from '@angular/core';
import {Gerente} from "./gerente.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

export class TipoOperacao{
  public idTipoOpe: number;
  public tipoOpe: string;

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
  public gerente: Observable<Gerente>;
  public  tipoOpe: TipoOperacao;
}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CadastroOperacaoService {

  constructor(private httpClient: HttpClient) {
  }
  getOperacoes(){
  return this.httpClient.get<Operacao[]>('http://localhost:8080/operacoes',httpOptions);
}
  cadastrarOperacao(operacao: Operacao): Observable<Operacao> {
    return this.httpClient.post<Operacao>('http://localhost:8080/operacoes/cadastraroperacao', operacao, httpOptions);
  }
}
