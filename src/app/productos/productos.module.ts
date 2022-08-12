import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ListaComponent } from './pages/lista/lista.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {CurrencyPipe} from '@angular/common';

@NgModule({
  declarations: [
    AgregarComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[CurrencyPipe]
})
export class ProductosModule { }
