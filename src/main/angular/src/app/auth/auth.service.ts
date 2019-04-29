import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Gerente, loginGerenteInfo} from '../service/gerente.service';
import {Observable} from 'rxjs';
import {Funcionario, loginFuncionarioInfo} from "../service/funcionario.service";

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

  private loginUrl = 'http://localhost:8080/usuarios/logar';
  private loginFuncionarioUrl = 'http://localhost:8080/usuarios/logar';
  private signupUrlGerente = 'http://localhost:8080/gerentes/cadastrar';
  private signupUrlFuncionario = 'http://localhost:8080/funcionarios/cadastrar';

  constructor(private http: HttpClient) {
  }

  loginAutenticado(credentials: loginGerenteInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  loginFuncionarioAutenticado(credentials: loginFuncionarioInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginFuncionarioUrl, credentials, httpOptions);
  }

  cadastrarGerenteAuth(info: Gerente): Observable<Gerente> {
    return this.http.post<Gerente>(this.signupUrlGerente, info, httpOptions);
  }

  cadastrarFuncionarioAuth(info: Funcionario): Observable<Funcionario>{
    return this.http.post<Funcionario>(this.signupUrlFuncionario, info, httpOptions);
  }

}
