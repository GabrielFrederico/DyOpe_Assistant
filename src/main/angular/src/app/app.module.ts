import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule, routingComponent, routingComponent2} from './app-routing.module';
import {routingComponent3, routingComponent4, routingComponent5, routingComponent6} from './app-routing.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { GerenteComponent } from './gerente/gerente.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

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
        NavBarComponent,
        NavComponent,
        GerenteComponent
    ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    NgbCollapseModule,
    NgbModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    FormsModule
  ],
    exports: [RouterModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
