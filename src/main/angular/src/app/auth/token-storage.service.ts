import {Injectable} from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const PASSWORD_KEY = 'AuthPassword';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles: Array<string> = [];

  constructor() {
  }

  logOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(nomeUsuario: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, nomeUsuario);
  }
  public savePassword(senha:string){
    window.sessionStorage.removeItem(PASSWORD_KEY);
    window.sessionStorage.setItem(PASSWORD_KEY, senha);

  }

  public getPassword(): string {
    return sessionStorage.getItem(PASSWORD_KEY);
  }
  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }
}
