import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginGerenteComponent } from './login-gerente/login-gerente.component';
import {IndexComponent} from './index-app/index.component';
import {GerenteIndexComponent} from './gerente-index/gerente-index.component';
import {EsqueceuSenhaComponent} from './esqueceu-senha/esqueceu-senha.component';
import {CadastroGerenteComponent} from './cadastro-gerente/cadastro-gerente.component';
import {LoginFuncionarioComponent} from './login-funcionario/login-funcionario.component';
import {PerfilGerenteComponent} from './perfil-gerente/perfil-gerente.component';
import {OperacaoRiscoComponent} from "./operacao-risco/operacao-risco.component";


const routes: Routes = [
    {path: 'logingerente', component: LoginGerenteComponent},
    {path: 'loginfuncionario', component: LoginFuncionarioComponent},
    {path: '', component: IndexComponent},
    {path: 'gerenteindex', component: GerenteIndexComponent},
    {path: 'esqueceusenha', component: EsqueceuSenhaComponent},
    {path: 'cadastrogerente', component: CadastroGerenteComponent},
    {path: 'perfilgerente', component: PerfilGerenteComponent},
    {path: 'operacaorisco', component: OperacaoRiscoComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
export const routingComponent = [LoginGerenteComponent, LoginFuncionarioComponent, IndexComponent, GerenteIndexComponent];

export const routingComponent2 = [EsqueceuSenhaComponent, CadastroGerenteComponent, OperacaoRiscoComponent, PerfilGerenteComponent];
