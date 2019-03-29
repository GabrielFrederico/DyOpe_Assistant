import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginGerenteComponent } from './login-gerente/login-gerente.component';
import {IndexComponent} from './index-app/index.component';
import {GerenteIndexComponent} from './gerente-index/gerente-index.component';


const routes: Routes = [
    {path: 'logingerente', component: LoginGerenteComponent},
    {path: '', component: IndexComponent},
    {path: 'gerenteindex', component: GerenteIndexComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
export const routingComponent = [LoginGerenteComponent, IndexComponent, GerenteIndexComponent];


