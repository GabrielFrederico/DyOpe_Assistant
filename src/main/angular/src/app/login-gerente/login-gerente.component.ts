import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../auth/token-storage.service";
import {AuthService} from "../auth/auth.service";
import {loginGerenteInfo} from "../service/gerente.service";

@Component({
  selector: 'app-login',
  templateUrl: './logingerente-component.html',

})
export class LoginGerenteComponent {
  title = 'Login Gerente';

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: loginGerenteInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new loginGerenteInfo(
      this.form.nomeUsuario,
      this.form.senha);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigate(['/logingerente'])
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

}
