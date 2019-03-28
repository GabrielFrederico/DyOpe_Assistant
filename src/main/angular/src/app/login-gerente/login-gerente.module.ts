import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoginGerenteComponent } from './login-gerente.component';

@NgModule({
  declarations: [
    LoginGerenteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [LoginGerenteComponent]
})
export class LoginGerenteModule { }
