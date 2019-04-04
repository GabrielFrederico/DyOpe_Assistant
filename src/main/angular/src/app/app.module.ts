import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule, routingComponent, routingComponent2} from './app-routing.module';
import {routingComponent3, routingComponent4, routingComponent5, routingComponent6} from './app-routing.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AppComponent,
       routingComponent,
      routingComponent2,
        routingComponent3,
        routingComponent4,
        routingComponent5,
        routingComponent6,
        SidebarComponent,
        NavBarComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        NgbCollapseModule,
        NgbModule
    ],
    exports: [RouterModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
