import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppsRoutingModule } from './apps-routing.module';
import { WardComponent } from './ward/ward.component';
import { ListwardComponent } from './listward/listward.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { LayoutComponent } from './layout/layout.component';
import {DataTablesModule} from 'angular-datatables';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    WardComponent,
    ListwardComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    ModalModule.forRoot(),
    DataTablesModule,
    FormsModule
  ]
})
export class AppsModule { }
