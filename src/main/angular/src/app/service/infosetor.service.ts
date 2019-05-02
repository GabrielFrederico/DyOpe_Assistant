import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class Infosetor {
  public id:number;
  public setor: string;
  public operacao: string;
  public qtdPecasOpe: string;
  public tempoNecessario: string;
}

@Injectable({
  providedIn: 'root'
})
export class InfosetorService {

  constructor(private httpClient: HttpClient) { }

  getInfosetor() {
    return this.httpClient.get<Infosetor[]>('http://localhost:8080/infosetores');
  }

  cadastrarInfosetor(infosetor: Infosetor): Observable<Infosetor> {
    return this.httpClient.post<Infosetor>('http://localhost:8080/cadastrar/cadastrarinfosetor', infosetor);
  }
}

