import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarcasRoutingModule } from './marcas-routing.module';
import { ListaComponent } from './pages/lista/lista.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListaComponent,
    AgregarComponent
  ],
  imports: [
    CommonModule,
    MarcasRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class MarcasModule { }
