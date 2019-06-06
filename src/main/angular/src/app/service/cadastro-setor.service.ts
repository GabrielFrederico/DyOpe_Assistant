import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EtapaProducao} from './cadastro-operacao.service';

export class Setor {
  public id: number;
  public nomeSetor: string;
  public etapaproducao_id: number;
  public gerente_id: number;
}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CadastroSetorService {

  constructor(private httpClient: HttpClient) {
  }

  getSetor() {
    return this.httpClient.get<Setor[]>('http://localhost:8080/setores', httpOptions);
  }

  getSetorNome(nome: string): Observable<Setor>   {
    return this.httpClient.get<Setor>('http://localhost:8080/setores/getByNome/'+nome, httpOptions);
  }

  cadastrarSetor(setor: Setor): Observable<Setor> {
    return this.httpClient.post<Setor>('http://localhost:8080/setores/cadastrarsetor', setor, httpOptions);
  }

}
