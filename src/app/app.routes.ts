import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductosComponent } from './component/productos/productos.component';
import { RealizarCompraComponent } from './component/realizar-compra/realizar-compra.component';
import { PortalLayoutComponent } from './layouts/portal-layout/portal-layout.component';
import { SystemLayoutComponent } from './layouts/system-layout/system-layout.component';
import { NgModule } from '@angular/core';
import { TrabajadoresListaComponent } from './component/trabajadores-lista/trabajadores-lista.component';

export const routes: Routes = [
    {
        path: '',
        component: PortalLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'productos', component: ProductosComponent}
        ]
    },
    {
        path: 'sistema',
        component: SystemLayoutComponent,
        children: [
            { path: 'realizar-compra', component: RealizarCompraComponent},
            { path: 'trabajadores', component: TrabajadoresListaComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }