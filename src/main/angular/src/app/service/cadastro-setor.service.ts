import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Setor {
  public id: number;
  public nomeSetor: string;
  // tslint:disable-next-line:variable-name variable-name
  public etapaproducao_id: number;
  // tslint:disable-next-line:variable-name
  public gerente_id: number;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CadastroSetorService {

  constructor(private httpClient: HttpClient) {
  }
  getSetorId(id: number) {
    return this.httpClient.get('http://localhost:8080/setores/' + id);
  }
  getSetor() {
    return this.httpClient.get<Setor[]>('http://localhost:8080/setores', httpOptions);
  }

  getSetorNome(nome: string) {
    return this.httpClient.get('http://localhost:8080/setores/getByNome/' + nome);
  }

  cadastrarSetor(setor: Setor): Observable<Setor> {
    return this.httpClient.post<Setor>('http://localhost:8080/setores/cadastrarsetor', setor, httpOptions);
  }

}
