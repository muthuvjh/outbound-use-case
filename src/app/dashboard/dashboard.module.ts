import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgSimpleSidebarModule } from 'ng-simple-sidebar';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { AgendaddComponent } from './agendadd/agendadd.component';
import { ExportdataComponent } from './exportdata/exportdata.component';
import { ReactiveFormsModule } from '@angular/forms';
import { KeyValuePipe } from "@angular/common";
import { DashboardsComponent } from './dashboards/dashboards.component';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  declarations: [
    SidebarComponent,
    FileuploadComponent,
    AgendaddComponent,
    ExportdataComponent,DashboardsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,NgSimpleSidebarModule,
    ReactiveFormsModule,HttpClientModule
  ],
  providers:[KeyValuePipe]
})
export class DashboardModule { }
