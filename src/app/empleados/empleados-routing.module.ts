import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './components/agregar/agregar.component';
import { ListaComponent } from './pages/lista/lista.component';

const routes: Routes = [
  {
  path:'',
    children:[     
      {path:'lista',component: ListaComponent} ,
      {path:'agregar',component: AgregarComponent},
      {path:'editar/:id',component: AgregarComponent} ,    
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
