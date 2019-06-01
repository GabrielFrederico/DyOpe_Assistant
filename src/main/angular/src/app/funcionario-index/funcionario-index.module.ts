import {SidebarComponent} from '../sidebar/sidebar.component';
import {FuncionarioIndexComponent} from './funcionario-index.component';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {OperacaoCosturaComponent} from '../operacao-costura/operacao-costura.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule} from '@angular/forms';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import {BrMaskerModule} from 'brmasker-ionic-3';
import {PerfilFuncionarioComponent} from '../perfil-funcionario/perfil-funcionario.component';
import {SharedModule} from '../sidebar/shared.module';
import {NavegacaoComponent} from '../navegacao/navegacao.component';
import {FuncionarioIndexRoutingModule} from './funcionario-index.routing.module';
import {InformacoesSetorComponent} from '../informacoes-setor/informacoes-setor.component';
import {HomeFuncionarioComponent} from "../home-funcionario/home-funcionario.component";

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    FuncionarioIndexComponent,
    PerfilFuncionarioComponent,
    NavegacaoComponent,
    PerfilFuncionarioComponent,
    InformacoesSetorComponent,
    HomeFuncionarioComponent
  ],
  imports: [
    FuncionarioIndexRoutingModule,
    NgbModule,
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ShowHidePasswordModule,
    BrMaskerModule
  ],
})
export class FuncionarioIndexModule {
}
