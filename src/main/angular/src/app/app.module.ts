import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {
  AppRoutingModule,
  routingComponent,
  routingComponent2,
  routingComponent3,
  routingComponent4,
  routingComponent5
} from './app-routing.module';
import {NgbCollapseModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavComponent} from './nav/nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ShowHidePasswordModule} from 'ngx-show-hide-password';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {BrMaskerModule} from 'brmasker-ionic-3';
import {RedefinirSenhaComponent} from './redefinir-senha/redefinir-senha.component';
import {SharedModule} from './sidebar/shared.module';

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
    NavComponent,
    RedefinirSenhaComponent,

  ],
  imports: [
    AppRoutingModule,
    NgbModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    LayoutModule,
    NgbCollapseModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    MatMenuModule,
    MatButtonToggleModule,
    ShowHidePasswordModule,
    BrMaskerModule, SharedModule],
  exports: [RouterModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
