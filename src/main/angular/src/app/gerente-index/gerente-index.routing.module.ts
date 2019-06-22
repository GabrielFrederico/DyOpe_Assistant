import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {OperacaoCosturaComponent} from '../operacao-costura/operacao-costura.component';
import {GerenteIndexComponent} from './gerente-index.component';
import {OperacaoCorteComponent} from '../operacao-corte/operacao-corte.component';
import {AndamentoOperacoesComponent} from '../andamento-operacoes/andamento-operacoes.component';
import {OperacaoAcabamentoComponent} from '../operacao-acabamento/operacao-acabamento.component';
import {OperacaoBeneficiamentoComponent} from '../operacao-beneficiamento/operacao-beneficiamento.component';
import {CadastroSetorComponent} from '../cadastro-setor/cadastro-setor.component';
import {ControleFuncionariosComponent} from '../controle-funcionarios/controle-funcionarios.component';
import {PerfilGerenteComponent} from '../perfil-gerente/perfil-gerente.component';
import {SequenciaOperacionalComponent} from '../sequencia-operacional/sequencia-operacional.component';
import {HomeGerenteComponent} from '../home-gerente/home-gerente.component';
import {PlanilhaCustoComponent} from '../planilha-custo/planilha-custo.component';
import {ErroComponent} from '../erro/erro.component';

const rotas: Routes = [
  {
    path: '', component: GerenteIndexComponent,
    children: [
      {path: 'operacaocostura', component: OperacaoCosturaComponent},
      {path: 'operacaocorte', component: OperacaoCorteComponent},
      {path: 'operacaoacabamento', component: OperacaoAcabamentoComponent},
      {path: 'operacaobeneficiamento', component: OperacaoBeneficiamentoComponent},
      {path: 'andamentooperacoes', component: AndamentoOperacoesComponent},
      {path: 'cadastrosetor', component: CadastroSetorComponent},
      {path: 'controlefuncionarios/:id', component: ControleFuncionariosComponent},
      {path: 'cadastrosetor', component: CadastroSetorComponent},
      {path: 'perfilgerente', component: PerfilGerenteComponent},
      {path: 'operacoes/:etapaProducao', component: SequenciaOperacionalComponent},
      {path: 'homegerente', component: HomeGerenteComponent},
      {path: 'planilhadecusto', component: PlanilhaCustoComponent},
      {path: '', redirectTo: 'homegerente'},

    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class GerenteIndexRoutingModule {
}
