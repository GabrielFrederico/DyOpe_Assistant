import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {cadastroGerenteInfo, loginGerenteInfo} from "../service/gerente.service";
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

export class JwtResponse {
  accessToken: string;
  type: string;
  username: string;
  authorities: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8080/gerentes/logar';
  private signupUrl = 'http://localhost:8080/gerentes/cadastrar';

  constructor(private http: HttpClient) {
  }

  loginGerenteAutenticado(credentials: loginGerenteInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  cadastrarGerenteAuth(info: cadastroGerenteInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }


}
