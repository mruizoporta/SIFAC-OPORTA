import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RutasRoutingModule } from './rutas-routing.module';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ListaComponent } from './pages/lista/lista.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    RutasRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RutasModule { }
