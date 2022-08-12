import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './auth/guards/validar-token.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'dashboard',
    loadChildren:() => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate:[ValidarTokenGuard],
    canLoad:[ValidarTokenGuard]
  },
  {
    path:'categorias',
    loadChildren: ()=> import('./categorias/categorias.module').then(m=> m.CategoriasModule),
    canLoad:[ValidarTokenGuard],
    canActivate:[ValidarTokenGuard]
  },
  {
    path:'marcas',
    loadChildren: ()=> import('./marcas/marcas.module').then(m=> m.MarcasModule),
    canLoad:[ValidarTokenGuard],
    canActivate:[ValidarTokenGuard]
  },
  {
    path:'empleado',
    loadChildren: ()=> import('./empleados/empleados.module').then(m=> m.EmpleadosModule),
    canLoad:[ValidarTokenGuard],
    canActivate:[ValidarTokenGuard]
  },
  {
    path:'producto',
    loadChildren: ()=> import('./productos/productos.module').then(m=> m.ProductosModule),
    canLoad:[ValidarTokenGuard],
    canActivate:[ValidarTokenGuard]
  },
  {
    path:'ruta',
    loadChildren: ()=> import('./rutas/rutas.module').then(m=> m.RutasModule),
    canLoad:[ValidarTokenGuard],
    canActivate:[ValidarTokenGuard]
  },
  {
    path:'zona',
    loadChildren: ()=> import('./zonas/zonas.module').then(m=> m.ZonasModule),
    canLoad:[ValidarTokenGuard],
    canActivate:[ValidarTokenGuard]
  },
  {
    path:'**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
