import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthService} from '../auth/auth.service';
import {loginGerenteInfo} from '../service/gerente.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {not} from "rxjs/internal-compatibility";
import {LoginInfo} from "../service/login-info";

@Component({
  selector: 'app-login',
  templateUrl: './logingerente-component.html',

})
export class LoginGerenteComponent implements OnInit {
  title = 'Login Gerente';
  closeResult: string;
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: LoginInfo;

  constructor(private modalService: NgbModal, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) {
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

    if (this.roles !== ['admin'] &&  this.roles !== ['funcionario'] ) {
      this.authService.loginAutenticado(this.loginInfo).subscribe(
        data => {
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUsername(data.username);
          this.tokenStorage.saveAuthorities(data.authorities);

          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getAuthorities();
          this.router.navigate(['/gerenteindex']);
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isLoginFailed = true;
        }
      );
    } else {
      this.isLoginFailed = true;
    }


  }


}
