import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class Infosetor {
  public id:number;
  public setor: string;
  public operacao: string;
  public gerente_id: number;
  public operacao_id: number;
  public funcionario_id: number;
  public qtdPecasOpe: string;
  public tempoNecessario: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfosetorService {

  constructor(private httpClient: HttpClient) { }

  getInfosetor() {
    return this.httpClient.get<Infosetor[]>('http://localhost:8080/infosetor');
  }

  cadastrarInfosetor(infosetor: Infosetor): Observable<Infosetor> {
    return this.httpClient.post<Infosetor>('http://localhost:8080/infosetor/cadastrarinfosetor', infosetor);
  }
}

