import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';

const routes: Routes = [{path:'',component:LoginComponent},{path:'usre',
loadChildren:()=>import('./user/user.module').then(mod=>mod.UserModule)},
{path:'dash', loadChildren:()=>import('./dashboard/dashboard.module').then(mod=>mod.DashboardModule)}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
