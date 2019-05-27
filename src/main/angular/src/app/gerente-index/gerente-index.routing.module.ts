import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OperacaoCosturaComponent } from '../operacao-costura/operacao-costura.component';
import { GerenteIndexComponent } from './gerente-index.component';
import { OperacaoCorteComponent } from '../operacao-corte/operacao-corte.component';
import { OperacaoRiscoComponent } from '../operacao-risco/operacao-risco.component';
import { OperacaoAcabamentoComponent } from '../operacao-acabamento/operacao-acabamento.component';
import { OperacaoBeneficiamentoComponent } from '../operacao-beneficiamento/operacao-beneficiamento.component';
import { CadastroSetorComponent } from '../cadastro-setor/cadastro-setor.component';
import { ControleFuncionariosComponent } from '../controle-funcionarios/controle-funcionarios.component';
import { PerfilGerenteComponent } from '../perfil-gerente/perfil-gerente.component';

const rotas: Routes = [
{path: '', component: GerenteIndexComponent,
children:[
  {path: 'operacaocostura', component: OperacaoCosturaComponent},
  {path: 'operacaocorte', component: OperacaoCorteComponent},
  {path: 'operacaoacabamento', component: OperacaoAcabamentoComponent},
  {path: 'operacaobeneficiamento', component: OperacaoBeneficiamentoComponent},
  {path: 'operacaorisco/:id',  component: OperacaoRiscoComponent},
  {path: 'cadastrosetor', component: CadastroSetorComponent},
  {path: 'controlefuncionarios', component: ControleFuncionariosComponent},
  {path: 'cadastrosetor', component: CadastroSetorComponent},
  {path: 'perfilgerente', component: PerfilGerenteComponent},

]}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class GerenteIndexRoutingModule {
}
