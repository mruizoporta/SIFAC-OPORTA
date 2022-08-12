import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZonasRoutingModule } from './zonas-routing.module';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ListaComponent } from './pages/lista/lista.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    ZonasRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ZonasModule { }
