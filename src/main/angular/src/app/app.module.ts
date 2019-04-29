import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, Directive, Input, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {AppRoutingModule, routingComponent, routingComponent2} from './app-routing.module';
import {routingComponent3, routingComponent4, routingComponent5, routingComponent6} from './app-routing.module';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavComponent} from './nav/nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatMenuModule, MatButtonToggleModule
} from '@angular/material';
import {GerenteComponent} from './gerente/gerente.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {coerceBooleanProperty} from "@angular/cdk/coercion";
import {ShowHidePasswordModule} from "ngx-show-hide-password";
import {NavegacaoComponent} from "./navegacao/navegacao.component";

@Directive({
  selector: '[readonly],[readOnly]',
  host: {
    '[attr.readonly]': '_isReadonly ? "" : null'
  }
})
class ReadonlyDirective {
  _isReadonly = false;

  @Input() set readonly (v) {
    this._isReadonly = coerceBooleanProperty(v);
  };

  ngOnChanges(changes) {
    console.log(changes);
  }
}

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
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
    GerenteComponent,
    NavegacaoComponent,
    ReadonlyDirective
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
    FormsModule,
    MatMenuModule,
    MatButtonToggleModule,
    BrowserModule,
    ShowHidePasswordModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
