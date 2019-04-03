import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {
  AppRoutingModule,
  routingComponent,
  routingComponent2,
  routingComponent3,
  routingComponent4, routingComponent5, routingComponent6
} from './app-routing.module';
import {ErroComponent} from './erro/erro.component';
import {CadastroFuncionarioComponent} from './cadastro-funcionario/cadastro-funcionario.component';
import { CadastroSetorComponent } from './cadastro-setor/cadastro-setor.component';
import { ControleFuncionariosComponent } from './controle-funcionarios/controle-funcionarios.component';
import { FuncionarioIndexComponent } from './funcionario-index/funcionario-index.component';
import { InformacoesSetorComponent } from './informacoes-setor/informacoes-setor.component';
import { PerfilFuncionarioComponent } from './perfil-funcionario/perfil-funcionario.component';
import { OperacaoAcabamentoComponent } from './operacao-acabamento/operacao-acabamento.component';
import { OperacaoBeneficiamentoComponent } from './operacao-beneficiamento/operacao-beneficiamento.component';
import { OperacaoCorteComponent } from './operacao-corte/operacao-corte.component';
import { OperacaoCosturaComponent } from './operacao-costura/operacao-costura.component';
import { OperacaoRiscoComponent } from './operacao-risco/operacao-risco.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    routingComponent,
    routingComponent2,
    routingComponent3,
    routingComponent4,
    routingComponent5,
    routingComponent6,
    ErroComponent,
    CadastroFuncionarioComponent,
    CadastroSetorComponent,
    ControleFuncionariosComponent,
    FuncionarioIndexComponent,
    InformacoesSetorComponent,
    PerfilFuncionarioComponent,
    OperacaoAcabamentoComponent,
    OperacaoBeneficiamentoComponent,
    OperacaoCorteComponent,
    OperacaoCosturaComponent,
    OperacaoRiscoComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
