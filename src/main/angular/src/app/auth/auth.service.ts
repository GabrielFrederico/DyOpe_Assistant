import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {cadastroGerenteInfo} from "../service/gerente.service";
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

  constructor(private http: HttpClient) {


  }
}
