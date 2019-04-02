import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LoginFuncionarioComponent} from './login-funcionario.component';

@NgModule({
  declarations: [
    LoginFuncionarioComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [LoginFuncionarioComponent]
})
export class LoginFuncionarioModule { }
