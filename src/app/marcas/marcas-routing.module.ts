import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './pages/lista/lista.component';

const routes: Routes = [
  {
    path:'',
    children:[     
      {path:'lista',component: ListaComponent}    
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcasRoutingModule { }
