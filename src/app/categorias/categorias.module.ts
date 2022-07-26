import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { SharedModule } from '../shared/shared.module';
import {ListaComponent} from './components/lista/lista.component';
import { AgregarComponent } from './components/agregar/agregar.component';
import { AgregarPageComponent } from './pages/agregar-page/agregar-page.component';
import { ListaPageComponent } from './pages/lista-page/lista-page.component';
import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';

@NgModule({
  declarations: [ ListaComponent, AgregarComponent, AgregarPageComponent, ListaPageComponent],

  imports: [
    CommonModule,
    CategoriasRoutingModule,
    SharedModule,
    MaterialModule,
    PrimeNgModule
  ]
})
export class CategoriasModule { }
