import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { AuthGuard } from '../_guards/auth.guard';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { AgendaddComponent } from './agendadd/agendadd.component';
import { ExportdataComponent } from './exportdata/exportdata.component';
const routes: Routes = [{
  path:'sidebar', 
  canActivate:[AuthGuard],
  component:SidebarComponent,
  children:[
    {
      path:'file_upload',component:FileuploadComponent
    },
    {
      path:'agent_add',component:AgendaddComponent
    },
    {
      path:'export_data',component:ExportdataComponent
    },
    {
      path:'dashboard',component:DashboardsComponent
    },
    {
      path:'',component:DashboardsComponent
    }
  ]
  
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
