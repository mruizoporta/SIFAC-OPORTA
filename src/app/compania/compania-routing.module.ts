import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccompaniaComponent } from './pages/seleccompania/seleccompania.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'', component:SeleccompaniaComponent},
      {path:'**', redirectTo:''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniaRoutingModule { }
