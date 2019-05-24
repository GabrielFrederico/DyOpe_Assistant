import { SidebarComponent } from '../sidebar/sidebar.component';
import { GerenteIndexComponent } from './gerente-index.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { GerenteIndexRoutingModule } from './gerente-index.routing.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OperacaoCosturaComponent } from '../operacao-costura/operacao-costura.component';
import { RouterModule } from '@angular/router';

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    GerenteIndexComponent,
    SidebarComponent,
    OperacaoCosturaComponent,
    NavBarComponent,
  ],
  imports: [
    GerenteIndexRoutingModule,
    ],
  exports: [RouterModule],

})
export class GerenteIndexModule {
}
