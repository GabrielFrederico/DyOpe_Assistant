import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginGerenteComponent } from './login-gerente/login-gerente.component';
import {IndexComponent} from './index-app/index.component';


const routes: Routes = [
    {path: 'logingerente', component: LoginGerenteComponent},
    {path: 'home', component: IndexComponent},
    {path: '',   redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
export const routingComponent = [LoginGerenteComponent, IndexComponent];


