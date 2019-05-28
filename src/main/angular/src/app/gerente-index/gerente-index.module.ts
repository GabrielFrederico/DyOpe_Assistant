import { SidebarComponent } from '../sidebar/sidebar.component';
import { GerenteIndexComponent } from './gerente-index.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { GerenteIndexRoutingModule } from './gerente-index.routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OperacaoCosturaComponent } from '../operacao-costura/operacao-costura.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { OperacaoCorteComponent } from '../operacao-corte/operacao-corte.component';
import { ControleFuncionariosComponent } from '../controle-funcionarios/controle-funcionarios.component';
import { PerfilGerenteComponent } from '../perfil-gerente/perfil-gerente.component';
import { CadastroSetorComponent } from '../cadastro-setor/cadastro-setor.component';
import { OperacaoRiscoComponent } from '../operacao-risco/operacao-risco.component';
import { OperacaoAcabamentoComponent } from '../operacao-acabamento/operacao-acabamento.component';
import { OperacaoBeneficiamentoComponent } from '../operacao-beneficiamento/operacao-beneficiamento.component';
import { SharedModule } from '../sidebar/shared.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter'
@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    GerenteIndexComponent,
    SidebarComponent,
    OperacaoCosturaComponent,
    OperacaoCorteComponent,
    OperacaoRiscoComponent,
    OperacaoAcabamentoComponent,
    OperacaoBeneficiamentoComponent,
    PerfilGerenteComponent,
    CadastroSetorComponent,
    ControleFuncionariosComponent,
    NavBarComponent,
  ],
  imports: [
    GerenteIndexRoutingModule,
    NgbModule,
    AngularFontAwesomeModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ShowHidePasswordModule,
    BrMaskerModule,
    Ng2SearchPipeModule
    ],
})
export class GerenteIndexModule {
}
