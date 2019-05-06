import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

export class Setor {
  public id: number;
 public  nomeSetor: string;
 public operacao: string;
}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CadastroSetorService {

  constructor(private httpClient: HttpClient) { }
  getSetor() {
    return this.httpClient.get<Setor[]>('http://localhost:8080/setores', httpOptions);
  }

  cadastrarSetor(setor: Setor): Observable<Setor> {
    return this.httpClient.post<Setor>('http://localhost:8080/setores/cadastrarsetor', setor, httpOptions);
  }

}
