import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthCompaniaComponent } from './pages/authcompania/authcompania.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children: [
      {path:'login', component: LoginComponent},
      {path:'compania', component: AuthCompaniaComponent},
      {path:'**', redirectTo: 'login'}
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
