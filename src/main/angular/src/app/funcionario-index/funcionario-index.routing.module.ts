import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FuncionarioIndexComponent } from './funcionario-index.component';
import { PerfilFuncionarioComponent } from '../perfil-funcionario/perfil-funcionario.component';
import { InformacoesSetorComponent } from '../informacoes-setor/informacoes-setor.component';

const rotas: Routes = [
{path: '', component: FuncionarioIndexComponent,
children:[
    {path: 'perfilfuncionario', component: PerfilFuncionarioComponent},
    {path: 'informacoessetor', component: InformacoesSetorComponent}

]}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class FuncionarioIndexRoutingModule {
}
