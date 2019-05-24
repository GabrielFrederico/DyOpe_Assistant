import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OperacaoCosturaComponent } from '../operacao-costura/operacao-costura.component';

const rotas: Routes = [
{path: 'operacaocostura', component: OperacaoCosturaComponent}];

@NgModule({
  imports: [RouterModule.forRoot(rotas)],
  exports: [RouterModule]
})
export class GerenteIndexRoutingModule {
}
