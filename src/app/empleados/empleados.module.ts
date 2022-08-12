import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { ListaComponent } from './pages/lista/lista.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EmpleadosModule { }
