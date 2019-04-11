import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export class Setor {
 public  nomeSetor: string;
 public operacao: string;
}
@Injectable({
  providedIn: 'root'
})
export class CadastroSetorService {

  constructor(private httpClient: HttpClient) { }
  getSetor() {
    return this.httpClient.get<Setor[]>('http://localhost:8080/setores');
  }

  cadastrarSetor(setor: Setor): Observable<Setor> {
    return this.httpClient.post<Setor>('http://localhost:8080/setores/cadastrarsetor', setor);
  }
}
