import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainSidebarComponent } from './main-sidebar/main-sidebar.component';
import { ControlSidebarComponent } from './control-sidebar/control-sidebar.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [   
    MainHeaderComponent,
    MainSidebarComponent,    
    ControlSidebarComponent,
    MainFooterComponent,
    DialogoConfirmacionComponent    
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MaterialModule
  ],
  exports:[   
    MainHeaderComponent,
    MainSidebarComponent,   
    ControlSidebarComponent,
    MainFooterComponent]
})
export class SharedModule { }
