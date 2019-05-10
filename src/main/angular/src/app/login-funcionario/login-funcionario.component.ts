import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {Router} from "@angular/router";
import {loginFuncionarioInfo} from '../service/funcionario.service';
import {Alert} from "selenium-webdriver";

@Component({
  selector: 'app-login-funcionario',
  templateUrl: './login-funcionario.component.html'
})
export class LoginFuncionarioComponent implements OnInit {
  title = 'Login Funcionario';
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: loginFuncionarioInfo;
  @ViewChild("inputPassword") senhainput: ElementRef;

  constructor(private modalService: NgbModal, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  focosenha(){
    this.senhainput.nativeElement.focus();
  }
  onSubmit() {
    console.log(this.form);

    this.loginInfo = new loginFuncionarioInfo(
      this.form.nomeUsuario,
      this.form.senha);


      this.authService.loginAutenticado(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);
          this.roles = this.tokenStorage.getAuthorities();

          if (this.roles.toString() == 'ROLE_FUNCIONARIO') {

            this.isLoginFailed = false;
            this.isLoggedIn = true;

            this.router.navigate(['/funcionarioindex']);
          } else {
            this.tokenStorage.logOut();
            this.isLoginFailed = true;
          }
    },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
      );

  }
}
