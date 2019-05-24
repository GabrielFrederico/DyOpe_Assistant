import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OperacaoCosturaComponent } from '../operacao-costura/operacao-costura.component';
import { GerenteIndexComponent } from './gerente-index.component';

const rotas: Routes = [
{path: 'operacaocostura', component: OperacaoCosturaComponent},
{path: 'gerenteindex', component: GerenteIndexComponent}];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class GerenteIndexRoutingModule {
}
