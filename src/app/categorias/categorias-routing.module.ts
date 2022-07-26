import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPageComponent } from './pages/agregar-page/agregar-page.component';
import { ListaPageComponent } from './pages/lista-page/lista-page.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'agregar',component: AgregarPageComponent },
      {path:'lista',component: ListaPageComponent}    
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
