import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule, routingComponent, routingComponent2} from './app-routing.module';
import { OperacaoRiscoComponent } from './operacao-risco/operacao-risco.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AppComponent,
       routingComponent,
      routingComponent2,
        SidebarComponent,
        NavBarComponent
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
