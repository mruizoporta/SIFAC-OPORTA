import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniaRoutingModule } from './compania-routing.module';
import { SeleccompaniaComponent } from './pages/seleccompania/seleccompania.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    SeleccompaniaComponent
  ],
  imports: [
    CommonModule,
    CompaniaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule
  ],
  exports:[ReactiveFormsModule]
})
export class CompaniaModule { }
