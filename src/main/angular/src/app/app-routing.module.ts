import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGerenteComponent} from './login-gerente/login-gerente.component';
import {IndexComponent} from './index-app/index.component';
import {EsqueceuSenhaComponent} from './esqueceu-senha/esqueceu-senha.component';
import {CadastroGerenteComponent} from './cadastro-gerente/cadastro-gerente.component';
import {LoginFuncionarioComponent} from './login-funcionario/login-funcionario.component';
import {ErroComponent} from './erro/erro.component';
import {CadastroFuncionarioComponent} from './cadastro-funcionario/cadastro-funcionario.component';
import {NavComponent} from './nav/nav.component';
import {RedefinirSenhaComponent} from "./redefinir-senha/redefinir-senha.component";


const routes: Routes = [
  {path: 'logingerente', component: LoginGerenteComponent},
  {path: 'loginfuncionario', component: LoginFuncionarioComponent},
  {path: '', component: IndexComponent},
  {path: 'gerenteindex', loadChildren: './gerente-index/gerente-index.module#GerenteIndexModule'},
  {path: 'funcionarioindex', loadChildren: './funcionario-index/funcionario-index.module#FuncionarioIndexModule'},
  {path: '**', component: ErroComponent},
  {path: 'esqueceusenha', component: EsqueceuSenhaComponent},
  {path: 'cadastrogerente', component: CadastroGerenteComponent},
  {path: 'cadastrofuncionario', component: CadastroFuncionarioComponent},
  {path: 'testebarra', component: NavComponent},
  {path: 'redefinirsenha', component: RedefinirSenhaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routingComponent = [LoginGerenteComponent, LoginFuncionarioComponent, IndexComponent];

export const routingComponent2 = [ErroComponent, EsqueceuSenhaComponent, CadastroGerenteComponent];

export const routingComponent3 = [CadastroFuncionarioComponent];

export const routingComponent4 = [NavComponent];

export const routingComponent5= [RedefinirSenhaComponent];
