import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniaRoutingModule } from './compania-routing.module';
import { SeleccompaniaComponent } from './pages/seleccompania/seleccompania.component';


@NgModule({
  declarations: [
    SeleccompaniaComponent
  ],
  imports: [
    CommonModule,
    CompaniaRoutingModule
  ]
})
export class CompaniaModule { }
