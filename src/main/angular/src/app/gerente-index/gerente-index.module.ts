import {SidebarComponent} from '../sidebar/sidebar.component';
import {GerenteIndexComponent} from './gerente-index.component';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {GerenteIndexRoutingModule} from './gerente-index.routing.module';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {OperacaoCosturaComponent} from '../operacao-costura/operacao-costura.component';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {FormsModule} from '@angular/forms';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import {BrMaskerModule} from 'brmasker-ionic-3';
import {OperacaoCorteComponent} from '../operacao-corte/operacao-corte.component';
import {ControleFuncionariosComponent} from '../controle-funcionarios/controle-funcionarios.component';
import {PerfilGerenteComponent} from '../perfil-gerente/perfil-gerente.component';
import {CadastroSetorComponent} from '../cadastro-setor/cadastro-setor.component';
import {AndamentoOperacoesComponent} from '../andamento-operacoes/andamento-operacoes.component';
import {OperacaoAcabamentoComponent} from '../operacao-acabamento/operacao-acabamento.component';
import {OperacaoBeneficiamentoComponent} from '../operacao-beneficiamento/operacao-beneficiamento.component';
import {SharedModule} from '../sidebar/shared.module';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import {SequenciaOperacionalComponent} from '../sequencia-operacional/sequencia-operacional.component';
import {HomeGerenteComponent} from '../home-gerente/home-gerente.component';
import {PlanilhaCustoComponent} from '../planilha-custo/planilha-custo.component';
import {MatInputModule, MatOptionModule, MatSelectModule} from '@angular/material';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    GerenteIndexComponent,
    SidebarComponent,
    OperacaoCosturaComponent,
    OperacaoCorteComponent,
    AndamentoOperacoesComponent,
    OperacaoAcabamentoComponent,
    OperacaoBeneficiamentoComponent,
    PerfilGerenteComponent,
    CadastroSetorComponent,
    ControleFuncionariosComponent,
    NavBarComponent,
    SequenciaOperacionalComponent,
    HomeGerenteComponent,
    PlanilhaCustoComponent
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
    Ng2SearchPipeModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,

  ],
})
export class GerenteIndexModule {
}
