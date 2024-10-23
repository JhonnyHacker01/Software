import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MarcasComponent } from './marcas/marcas.component';
import { ModelosComponent } from './modelos/modelos.component';
import { ProductosComponent } from './productos/productos.component';
import { ListapreciosComponent } from './listaprecios/listaprecios.component';

import { AuthGuard } from '../service/guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'marcas', component: MarcasComponent, canActivate: [AuthGuard]},
  { path: 'modelos', component: ModelosComponent, canActivate: [AuthGuard]},
  { path: 'productos', component: ProductosComponent, canActivate: [AuthGuard]},
  { path: 'listaprecios', component: ListapreciosComponent, canActivate: [AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
